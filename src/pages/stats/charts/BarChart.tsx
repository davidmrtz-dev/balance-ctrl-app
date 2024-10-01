import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grays.lighter};
  margin: 16px 0;
  border-radius: 4px;
  width: 100%;
  height: 100%;
`;

export const BarChart = ({
  id,
  labelA,
  labelAData,
  labelAColor,
  labelB,
  labelBData,
  labelBColor,
  bottom,
}: {
  [key: string]: string
}): JSX.Element => {
  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = [bottom];

  const data = {
    labels,
    datasets: [
      {
        label: labelA,
        data: [labelAData],
        backgroundColor: labelAColor,
      },
      {
        label: labelB,
        data: [labelBData],
        backgroundColor: labelBColor,
      }
    ],
  };

  return(<BarChartContainer id={id}>
    <Bar options={options} data={data} />
  </BarChartContainer>
  );
}
