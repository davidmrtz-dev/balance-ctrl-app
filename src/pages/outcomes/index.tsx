import { useCallback, useEffect, useState } from "react";
import { IOutcome, TransactionType } from "../../@types";
import { getOutcomes, searchOutcomes } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Outcome } from "./Outcome";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import Alert from "../../components/alert";
import styled from "styled-components";
import Search from "./search";
import Title from "../../components/title";
import { OutcomeCreate, OutcomeUpdate } from "../../components/outcomes";
import { newOutcome } from "../../generators/emptyObjects";

const OutcomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const Outcomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [selectedType, setSelectedType] = useState<TransactionType>('' as TransactionType);
  const [showUpdate, setShowUpdate] = useState(false);
  const [outcome, setOutcome] = useState<IOutcome>(newOutcome('current'));
  const [outcomes, setOutcomes] = useState<IOutcome []>([]);
  const [searchTerm, setSearchTerm] = useDebouncedState<string>('', 100);
  const [dates, setDates] = useState<string []>(['', '']);
  const [type, setType] = useState<TransactionType | ''>('');

  const displayOutcomes = () => {
    if (type) {
      return outcomes.filter(i => i.transaction_type === type);
    } else {
      return outcomes
    }
  };

  const fetchOutcomes = async (): Promise<void> => {
    try {
      const data = await getOutcomes({ offset: 0, limit: 20 });
      setOutcomes(data.outcomes);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  };

  const search = useCallback(async (keyword: string, dates: string []): Promise<void> => {
    try {
      setLoading(true);
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
        text: (error || 'There was an error, please try again.'),
      }), 1000);
    }
  }, []);

  const handleOutcomeClick = (outcome: IOutcome) => {
    setShowUpdate(true);
    setOutcome(outcome);
  };

  const handleUpdateClose = () => {
    setShowUpdate(false);
    setOutcome(newOutcome('current'));
  };

  const handleUpdate = async (outcome: IOutcome) => {
    if (outcomes.length) {
      const updatedOutcomes = outcomes.map(out => {
        if (out.id === outcome.id) {
          return outcome;
        } else {
          return out;
        }
      });
      setOutcomes(updatedOutcomes);
    }
  };

  const handleDelete = (id: number) => {
    if (outcomes.length) {
      const updatedOutcomes = outcomes.filter(out => out.id !== id);
      setOutcomes(updatedOutcomes);
    }
  };

  useEffect(() => {
    fetchOutcomes();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    if (searchTerm || dates.every(d => d)) {
      search(searchTerm, dates);
    } else {
      fetchOutcomes();
    }
  }, [searchTerm, dates, search]);

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
        </OutcomesContainer>
    }
    {selectedType && (<OutcomeCreate
      open={showNew}
      type={selectedType}
      closeModal={handleAddClose}
      handleCreate={async () => {}}
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