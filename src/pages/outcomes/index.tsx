import { useEffect, useState } from "react";
import { IOutcome, TransactionType } from "../../@types";
import { getOutcomes, searchOutcomes } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Outcome } from "../../components/outcomes";
import Alert from "../../components/alert";
import styled from "styled-components";
import { useDebouncedState } from "../../hooks/useDebouncedState";
import Search from "./search";
import { TransactionUpdate as OutcomeUpdate } from "../../components/transactions";

const OutcomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 100%;
  width: 100%;
`;

const Outcomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [outcomes, setOutcomes] = useState<IOutcome []>([]);
  const [searchTerm, setSearchTerm] = useDebouncedState<string>('', 100);
  const [dates, setDates] = useState<string []>(['', '']);
  const [type, setType] = useState<TransactionType | ''>('');
  const [edit, setEdit] = useState(false);
  const [outcome, setOutcome] = useState<IOutcome>({} as IOutcome);

  const displayOutcomes = () => {
    if (type) {
      return outcomes.filter(i => i.transaction_type === type);
    } else {
      return outcomes
    }
  };

  const search = async (keyword: string, dates: string []): Promise<void> => {
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
  };

  const handleOutcomeClick = (outcome: IOutcome) => {
    setEdit(true);
    setOutcome(outcome);
  };

  const handleEditClose = () => {
    setEdit(false);
    setOutcome({} as IOutcome);
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
    const fetchOutcomes = async (): Promise<void> => {
      try {
        const data = await getOutcomes({ offset: 0, limit: 20 });
        setOutcomes(data.outcomes);
        setTimeout(() => setLoading(false), 1500);
      } catch (err) {
        setTimeout(() => Alert({
          icon: 'error',
          title: 'Ops!',
          text: 'There was an error, please try again later'
        }), 1000);
      }
    };

    fetchOutcomes();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  useEffect(() => {
    if (searchTerm || dates.every(d => d)) search(searchTerm, dates);
  }, [searchTerm, dates]);

  return(<>
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
    <OutcomeUpdate
      outcome={outcome}
      open={edit}
      closeModal={handleEditClose}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
    />
  </>);
};

export default Outcomes;