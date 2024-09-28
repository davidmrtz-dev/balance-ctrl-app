import { IOnboardingConfig } from "../../../@types";

export const onboardingConfig: IOnboardingConfig = {
  '/': [
    {
      id: 'dashboard-1',
      title: 'Welcome to the Dashboard',
      description: 'View your activity overview, including income, expenses, balance, and analytics compared to the last period. You can also navigate to this section by clicking on it.',
      selector: '#home-header',
    },
    {
      id: 'dashboard-2',
      title: 'Cash and Debit Purchases',
      description: 'Use the buttons to view this month’s purchases. Click on a purchase for more details. In the details view, you can also edit the purchase.',
      selector: '#home-current-outcomes',
    },
    {
      id: 'dashboard-3',
      title: 'Credit Purchases',
      description: 'Click a credit purchase to see details. Navigate older items within this month using the buttons. In the details view, you can also edit the purchase.',
      selector: '#home-fixed-outcomes',
    },
  ],
  '/balance': [
    { id: 'balance-1', title: 'Tu Balance Actual', description: 'Revisa tu balance del mes actual.', selector: '#balance-card' },
    { id: 'balance-2', title: 'Pagos Realizados', description: 'Consulta los pagos que ya has realizado.', selector: '#outcomes-card' },
    { id: 'balance-3', title: 'Pagos Pendientes', description: 'Aquí puedes ver los pagos que están por hacer.', selector: '#outcomes-card' },
  ],
  '/stats': [
    { id: 'stats-1', title: 'Estadísticas de Gastos', description: 'Visualiza tus gastos mensuales de manera clara.', selector: '#stats-chart' },
    { id: 'stats-2', title: 'Comparativas', description: 'Compara tus gastos a lo largo de los meses.', selector: '#stats-chart' },
  ],
};
