import BalanceSelector from '../../components/balance-selector';
import { IBalance } from '../../@types';
import { useState } from 'react';
import { Header } from './header/Header';
import { Collapse } from 'antd';
import { theme } from '../../Theme';
import styled from 'styled-components';
import { LoadingWrapper } from '../../components/containers';
import { LoadingMask } from '../../atoms/LoadingMask';
import { FontText } from '../../atoms/text';
import { BarChart, LineChart, PieChart, PolarAreaChart } from './charts';
import { Offset } from '../../atoms/Offset';
import Onboarding from '../../components/onboarding';
const { Panel } = Collapse;

const PanelWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Stats = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState<IBalance | null>(null);
  const [pieChartData, setPieChartData] = useState<string []>([]);
  const [barChartA, setBarChartA] = useState<{ [key: string]: string }>({});
  const [barChartB, setBarChartB] = useState<{ [key: string]: string }>({});


  const handleBalance = (balance: IBalance) => {
    setBalance(balance);
    setPieChartData([
      balance.amount_incomes || '0.0',
      balance.amount_outcomes_current || '0.0',
      balance.amount_outcomes_fixed || '0.0'
    ]);
    setBarChartA({
      id: 'stats-bar-chart-a',
      labelA: 'Incomes',
      labelAData: balance.amount_incomes || '0.0',
      labelAColor: 'rgba(129, 199, 132, 0.5)',
      labelB: 'Outcomes',
      labelBColor: 'rgba(229, 115, 115, 0.5)',
      labelBData: balance.amount_for_payments || '0.0',
      bottom: balance.title
    });
    setBarChartB({
      id: 'stats-bar-chart-b',
      labelA: 'Current',
      labelAData: balance.amount_outcomes_current || '0.0',
      labelAColor: 'rgba(229, 115, 115, 0.5)',
      labelB: 'Fixed',
      labelBData: balance.amount_outcomes_fixed || '0.0',
      labelBColor: 'rgba(255, 207, 86, 0.5)',
      bottom: balance.title
    });
    setLoading(false);
  };

  return(<>
    <Onboarding route="/stats" />
    <Offset />
    <BalanceSelector
      id='stats-selector'
      handleBalance={handleBalance}
    />
    <Header
      id='stats-header'
      balance={balance}
      loading={loading}
    />
    <Collapse
      style={{ margin: '16px 0', backgroundColor: theme.colors.grays.light }}
      defaultActiveKey={['payments']}
      collapsible='disabled'
      expandIcon={() => <></>}
    >
      <Panel header={FontText('Stats')} key='payments' >
        <PanelWrapper id='panel-wrapper'>
          {loading
            ? (<LoadingWrapper height={'648px'} >
                <LoadingMask />
              </LoadingWrapper>)
            : (<ChartsContainer>
              <PieChart chartData={pieChartData} />
              <LineChart chartData={balance?.line_chart_data || {}} />
              <PolarAreaChart chartData={pieChartData} />
              <BarChart {...barChartA} />
              <BarChart {...barChartB} />
            </ChartsContainer>)
          }
        </PanelWrapper>
      </Panel>
    </Collapse>
  </>);
};

export default Stats;
