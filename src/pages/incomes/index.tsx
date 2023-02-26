import { Typography } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IIncome } from "../../@types";
import { getIncomes } from "../../api/core/Income";
import { LoadingMask } from "../../atoms/LoadingMask";
import Alert from "../../components/alert";
import { theme } from "../../Theme";

const IncomesContainer = styled.div<{ reveal: boolean }>`
  opacity: ${p => p.reveal ? 1 : 0};
  transition: opacity 1s ease-in-out;
  min-height: 100vh;
`;

const TitleWrapper = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5px;
  border-radius: 10px;
  margin-bottom: 10px;
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
    <TitleWrapper>
      <Typography.Text style={{
        ...theme.texts.brandH5,
        paddingLeft: 5
      }}>
        Incomes
      </Typography.Text>
    </TitleWrapper>
    {loading
      ? <LoadingMask fixed />
      : (<IncomesContainer reveal={reveal}>
      {(incomes || []).map(income =>
        <Income key={income.id} />
      )}
    </IncomesContainer>)}
  </>);
};

const IncomeContainer = styled.div`
  background-color: ${p => p.theme.colors.grays.light};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 5px 0;
  cursor: default;
  position: relative;
  height: 150px;
`;

const Income = (): JSX.Element => <IncomeContainer>

</IncomeContainer>

export default Incomes;