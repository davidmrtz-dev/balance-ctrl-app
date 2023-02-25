import { useEffect, useState } from "react";
import styled from "styled-components";
import { IIncome } from "../../@types";
import { getIncomes } from "../../api/core/Income";
import Alert from "../../components/alert";

const IncomesContainer = styled.div`
  min-height: 100vh;
`;

const Incomes = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
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

  return<>hello incomes</>;
};

export default Incomes;