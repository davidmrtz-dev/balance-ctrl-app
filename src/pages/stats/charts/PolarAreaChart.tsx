import styled from "styled-components";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChartContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grays.lighter};
  margin: 16px 0;
  border-radius: 4px;
`;

export const PolarAreaChart = ({ chartData }: { chartData: string []}): JSX.Element => {
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

  return(<PolarAreaChartContainer>
    <PolarArea data={data} />
  </PolarAreaChartContainer>
  );
}
