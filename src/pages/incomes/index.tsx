import { useEffect, useState } from "react";
import styled from "styled-components";
import { IIncome, TransactionType } from "../../@types";
import { getIncomes } from "../../api/core/Income";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import { Income } from "./Income";
import Title from "../../components/title";
import { IncomeCreate } from "../../components/incomes";

const IncomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const Incomes = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [reveal, setReveal] = useState(false);
  const [incomes, setIncomes] = useState<IIncome []>([]);
  const [selectedType, setSelectedType] = useState<TransactionType>('' as TransactionType);
  const [showNew, setShowNew] = useState(false);

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
    fetchIncomes();
  }, []);

  useEffect(() => {
    if (!loading) setTimeout(() => setReveal(true), 250);
  }, [loading]);

  return(<>
    {Title('Incomes', handleAddOpen)}
    {loading
      ? <LoadingMask fixed />
      : (<IncomesContainer reveal={reveal}>
      {(incomes || []).map(income =>
        <Income key={income.id} income={income} />
      )}
    </IncomesContainer>)}
    {/* {selectedType && (<IncomeCreate
      open={showNew}

    />)} */}
  </>);
};

export default Incomes;