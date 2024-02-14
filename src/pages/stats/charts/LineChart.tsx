import styled from "styled-components";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grays.lighter};
  margin: 16px 0;
  border-radius: 4px;
`;

export const LineChart = ({
  chartData
}: {
  chartData: { [key: string]: string [] };
}): JSX.Element => {
  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  const data = {
    labels: chartData.weeks || labels,
    datasets: [
      {
        label: 'Current',
        data: chartData.current,
        borderColor: 'rgb(229, 115, 115)',
        backgroundColor: 'rgba(229, 115, 115, 0.5)',
      },
      {
        label: 'Fixed',
        data: chartData.fixed,
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      }
    ],
  };

  return(<LineChartContainer>
    <Line options={options} data={data} />
  </LineChartContainer>
  );
}
