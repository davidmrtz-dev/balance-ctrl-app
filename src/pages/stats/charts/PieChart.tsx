import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grays.lighter};
  margin: 16px 0;
  border-radius: 4px;
`;

export const PieChart = ({ chartData }: { chartData: string []}): JSX.Element => {
  const data = {
    labels: ['Income', 'Current', 'Fixed'],
    datasets: [
      {
        label: 'Amount $',
        data: chartData,
        backgroundColor: [
          'rgba(129, 199, 132, 0.2)',
          'rgba(229, 115, 115, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(129, 199, 132, 1)',
          'rgba(229, 115, 115, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return(<PieChartContainer id='stats-pie-chart'>
    <Pie data={data} />
  </PieChartContainer>
  );
}
