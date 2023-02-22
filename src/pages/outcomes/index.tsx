import { useEffect, useState } from "react";
import { IOutcome, TransactionType } from "../../@types";
import { getOutcomes } from "../../api/core/Outcome";
import { LoadingMask } from "../../atoms/LoadingMask";
import { Outcome } from "../../components/outcomes";
import Alert from "../../components/alert";
import styled from "styled-components";
import { Button, Select, Typography } from "antd";
import { theme } from "../../Theme";

const OutcomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  height: 100%;
  width: 100%;
`;

type Selector =  TransactionType  | '';

const Outcomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [outcomes, setOutcomes] = useState<IOutcome []>([]);
  const [select, setSelect] = useState<Selector>('');

  const filteredOutcomes = (): IOutcome [] => {
    if (outcomes.length && select) {
      if (select === 'current') {
        return outcomes.filter(out => out.transaction_type === 'current')
      } else if (select === 'fixed') {
        return outcomes.filter(out => out.transaction_type === 'fixed')
      }
    }

    return outcomes;
  };

  useEffect(() => {
    const fetchOutcomes = async(): Promise<void> => {
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
    if (select) console.log(select);
  }, [select])

  return(<>
    {loading
      ? <LoadingMask fixed />
      : <OutcomesContainer reveal={reveal}>
          <Filter onSelect={setSelect} clearFilter={() => setSelect('')} disabled={false} />
          {(filteredOutcomes() || []).map(outcome =>
            <Outcome key={outcome.id} {...outcome} />
          )}
        </OutcomesContainer>
    }
  </>);
};

const FilterWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Filter = ({
  onSelect,
  clearFilter,
  disabled
}: {
  onSelect: (text: Selector) => void
  clearFilter: () => void;
  disabled: boolean;
}): JSX.Element => <FilterWrapper>
  <Typography.Text style={{
    ...theme.texts.brandSubFont
  }}>
    Filter by:
  </Typography.Text>
  <Select
    disabled={disabled}
    placeholder={'Option'}
    style={{ backgroundColor: theme.colors.grays.light, width: 135 }}
    dropdownStyle={{ backgroundColor: theme.colors.grays.light }}
    onSelect={onSelect}
    options={[
      { value: 'current', label: 'Current' },
      { value: 'fixed', label: 'Fixed' }
    ]}
  />
  <Button disabled={disabled} onClick={clearFilter}>Clear</Button>
</FilterWrapper>;

export default Outcomes;