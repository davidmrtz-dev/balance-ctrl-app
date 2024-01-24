import { useCallback, useEffect, useRef, useState } from "react";
import { ICategory, IOutcome, TransactionType } from "../../@types";
import { getOutcomesIndex, searchOutcomes } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Outcome } from "./Outcome";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import Alert from "../../components/alert";
import styled from "styled-components";
import Search from "./search";
import { OutcomeCreate, OutcomeUpdate } from "../../components/outcomes";
import { newOutcome } from "../../generators/emptyObjects";
import { Button } from "antd";
import { FontText } from "../../atoms/text";
import NotFound from "../not-found";
import { TwoOptsTitle } from "../../components/title/TwoOptsTitle";

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
  const [category, setCategory] = useState<ICategory | null>(null);
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
  const abortController = useRef<AbortController | null>(null);

  const displayOutcomes = () => {
    let filteredOutcomes = outcomes;

    if (type) {
      filteredOutcomes = outcomes.filter(i => i.transaction_type === type);
    }

    if (category) {
      filteredOutcomes = outcomes.filter(i => i.categories[0].id === category.id);
    }

    return filteredOutcomes;
  };

  const fetchOutcomes = useCallback(async (): Promise<void> => {
    if (page > 1) setLoadMore(true);

    if (abortController.current) {
      abortController.current.abort();
    }

    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    try {
      const data = await getOutcomesIndex({
        page,
        pageSize: 10,
        signal: newAbortController.signal
      });

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
      }, 1000);
    } catch (err: any) {
      if (err === undefined) return;

      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.errors || 'There was an error, please try again later'
      }), 1000);
    }
  }, [page]);

  const search = useCallback(async (keyword: string, dates: string []): Promise<void> => {
    setLoading(true);

    if (abortController.current) {
      abortController.current.abort();
    }

    const newAbortController = new AbortController();
    abortController.current = newAbortController;

    try {
      const data = await searchOutcomes({
        page: 1,
        pageSize: 50,
        keyword,
        start_date: dates[0],
        end_date: dates[1],
        signal: newAbortController.signal
      });

      setOutcomes(data.outcomes);
      setMeta(data.meta);
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

  const handleCreate = (outcome: IOutcome) => {
    setOutcomes(outcomes => [outcome, ...outcomes]);
  };

  const handleUpdate = (outcome: IOutcome) => {
    if (!outcomes.length) return;

    const updatedOutcomes = outcomes.map(o => o.id === outcome.id ? outcome : o);
    setOutcomes(updatedOutcomes);
  };

  const handleDelete = (id: number) => {
    if (!outcomes.length) return;

    const updatedOutcomes = outcomes.filter(out => out.id !== id);
    setOutcomes(updatedOutcomes);
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

  console.log('page', page);

  useEffect(() => {
    console.log('useEffect 1');
    fetchOutcomes();
  }, [fetchOutcomes]);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    console.log('useEffect 2');
    if (searchTerm || dates.every(d => d)) {
      search(searchTerm, dates);
    } else if (outcomes.length === 0) {
      fetchOutcomes();
    }
  }, [searchTerm, dates, search, fetchOutcomes]);

  return(<>
    {TwoOptsTitle('Purchases', handleAddOpen, 'Cash & Debit', 'Credit')}
    <Search
      search={searchTerm}
      setSearch={setSearchTerm}
      setDates={setDates}
      setType={setType}
      setCategory={setCategory}
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
          {(displayOutcomes().length > 9 && !loadMore && page < meta.total_pages) &&
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
          {displayOutcomes().length === 0 && <NotFound /> }
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
