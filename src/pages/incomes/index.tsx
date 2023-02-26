import { useEffect, useState } from "react";
import styled from "styled-components";
import { IIncome } from "../../@types";
import { getIncomes } from "../../api/core/Income";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import { Income } from "../../components/incomes";
import Title from "../../components/title";

const IncomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const Incomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [incomes, setIncomes] = useState<IIncome []>([]);

  const fetchIncomes = async () => {
    try {
      const data = await getIncomes({ offset: 0, limit: 20 });
      setIncomes(data.incomes);
      setTimeout(() => setLoading(false), 1500);
    } catch (err: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: err.error || 'There was an error, please try again later'
      }), 1000);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return(<>
    {Title('Incomes')}
    {loading
      ? <LoadingMask fixed />
      : (<IncomesContainer reveal={reveal}>
      {(incomes || []).map(income =>
        <Income key={income.id} />
      )}
    </IncomesContainer>)}
  </>);
};

export default Incomes;