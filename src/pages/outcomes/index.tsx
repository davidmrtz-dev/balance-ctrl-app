import { useCallback, useEffect, useState } from "react";
import { IOutcome, TransactionType } from "../../@types";
import { getOutcomesIndex, searchOutcomes } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Outcome } from "./Outcome";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import Alert from "../../components/alert";
import styled from "styled-components";
import Search from "./search";
import Title from "../../components/title";
import { OutcomeCreate, OutcomeUpdate } from "../../components/outcomes";
import { newOutcome } from "../../generators/emptyObjects";
import { Button } from "antd";
import { FontText } from "../../atoms/text";

const OutcomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const Outcomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [selectedType, setSelectedType] = useState<TransactionType>('' as TransactionType);
  const [showUpdate, setShowUpdate] = useState(false);
  const [outcome, setOutcome] = useState<IOutcome>(newOutcome('current'));
  const [outcomes, setOutcomes] = useState<IOutcome []>([]);
  const [searchTerm, setSearchTerm] = useDebouncedState<string>('', 100);
  const [dates, setDates] = useState<string []>(['', '']);
  const [type, setType] = useState<TransactionType | ''>('');
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<{
    current_page: number,
    per_page: number,
    total_pages: number,
    total_per_page: number
  }>({
    current_page: 0,
    per_page: 0,
    total_pages: 0,
    total_per_page: 0
  });

  const displayOutcomes = () => {
    if (type) {
      return outcomes.filter(i => i.transaction_type === type);
    } else {
      return outcomes;
    }
  };

  const fetchOutcomes = useCallback(async (): Promise<void> => {
    if (page > 1) setLoadMore(true);

    try {
      const data = await getOutcomesIndex({ page, pageSize: 10 });
      if (page > 1) {
        setOutcomes(outcomes => [...outcomes, ...data.outcomes]);
        setMeta(data.meta);
      } else {
        setOutcomes(data.outcomes);
        setMeta(data.meta);
      }
      setTimeout(() => {
        setLoading(false);
        setLoadMore(false);
      }, 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  }, [page]);

  const search = useCallback(async (keyword: string, dates: string []): Promise<void> => {
    setLoading(true);

    try {
      const data = await searchOutcomes({
        offset: 0,
        limit: 20,
        keyword,
        start_date: dates[0],
        end_date: dates[1]
      });
      setOutcomes(data.outcomes);
      setTimeout(() => setLoading(false), 1000);
    } catch (err: any) {
      const error = err.errors && err.errors.length && err.errors[0];
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: (error || 'There was an error, please try again later.'),
      }), 1000);
    }
  }, []);

  const handleOutcomeClick = (outcome: IOutcome) => {
    setOutcome(outcome);
    setShowUpdate(true);
  };

  const handleUpdateClose = () => {
    setShowUpdate(false);
    setOutcome(newOutcome('current'));
  };

  const handleCreate = async (outcome: IOutcome) => {
    // if (outcomes.length) {
    //   setOutcomes(outcomes => [outcome, ...outcomes]);
    // }
    await fetchOutcomes();
  };

  const handleUpdate = async (outcome: IOutcome) => {
    // if (outcomes.length) {
    //   const updatedOutcomes = outcomes.map(out => {
    //     if (out.id === outcome.id) {
    //       return outcome;
    //     } else {
    //       return out;
    //     }
    //   });
    //   setOutcomes(updatedOutcomes);
    // }
    await fetchOutcomes();
  };

  const handleDelete = (id: number) => {
    if (outcomes.length) {
      const updatedOutcomes = outcomes.filter(out => out.id !== id);
      setOutcomes(updatedOutcomes);
    }
  };

  const handleAddOpen = (type: TransactionType) => {
    setSelectedType(type);
    setShowNew(true);
  };

  const handleAddClose = () => {
    setShowNew(false);
    setTimeout(
      () => setSelectedType('' as TransactionType), 500
    );
  };

  useEffect(() => {
    fetchOutcomes();
  }, [fetchOutcomes]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    if (searchTerm || dates.every(d => d)) {
      search(searchTerm, dates);
    }
  }, [searchTerm, dates, search]);

  return(<>
    {Title('Outcomes', handleAddOpen)}
    <Search
      search={searchTerm}
      setSearch={setSearchTerm}
      setDates={setDates}
      setType={setType}
    />
    {loading
      ? <LoadingMask fixed />
      : <OutcomesContainer reveal={reveal}>
          {(displayOutcomes() || []).map(outcome =>
            <Outcome
              key={outcome.id}
              outcome={outcome}
              onClick={() => handleOutcomeClick(outcome)}
            />
          )}
          {(outcomes.length > 0 && !loadMore && page < meta.total_pages) &&
            <Button
              onClick={() => {
                if(page < meta.total_pages) setPage(page + 1);
              }}
              style={{ width: '100%', margin: '16px 0' }}
            >
              {FontText('Load more')}
            </Button>
          }
          {(loadMore) &&
            <div style={{ width: '100%', margin: '16px 0'}}>
              <LoadingMask width={35} height={35} />
            </div>
          }
        </OutcomesContainer>
    }
    {selectedType && (<OutcomeCreate
      open={showNew}
      type={selectedType}
      closeModal={handleAddClose}
      handleCreate={handleCreate}
    />)}
    <OutcomeUpdate
      outcome={outcome}
      open={showUpdate}
      type={outcome.transaction_type}
      closeModal={handleUpdateClose}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  </>);
};

export default Outcomes;
