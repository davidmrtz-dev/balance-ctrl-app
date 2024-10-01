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
      description: 'View cash and debit purchases made this month, sorted by the most recent. Click on a purchase for more details. In the details view, you can also edit the purchase.',
      selector: '#home-current-outcomes',
    },
    {
      id: 'dashboard-3',
      title: 'Add a Cash or Debit Purchase',
      description: 'Click the “+” button to add a new cash or debit purchase. Fill in the details and click “Create” to add the purchase. You can also cancel the operation.',
      selector: '#home-current-outcomes-add',
    },
    {
      id: 'dashboard-4',
      title: 'Navigate through Purchases',
      description: 'Use the navigation buttons to view older purchases within the current month.',
      selector: '#home-current-outcomes-pagination'
    },
    {
      id: 'dashboard-5',
      title: 'Credit Purchases',
      description: 'View credit purchases made this month, sorted by the most recent. Click a credit purchase to see details. Navigate older items within this month using the buttons. In the details view, you can also edit the purchase.',
      selector: '#home-fixed-outcomes',
    },
    {
      id: 'dashboard-6',
      title: 'Add a Credit Purchase',
      description: 'Click the “+” button to add a new credit purchase. Fill in the details and click “Create” to add the purchase. You can also cancel the operation.',
      selector: '#home-fixed-outcomes-add',
    },
    {
      id: 'dashboard-7',
      title: 'Navigate through Credit Purchases',
      description: 'Use the navigation buttons to view older purchases within the current month.',
      selector: '#home-fixed-outcomes-pagination'
    }
  ],
  '/balance': [
    {
      id: 'balance-1',
      title: 'Balance Selector',
      description: 'View your current month\'s balance and select previous balances for analysis.',
      selector: '#balance-selector',
    },
    {
      id: 'balance-2',
      title: 'Balance Information',
      description: 'See key balance info, including income, payments (cash and credit), applied payments, pending payments, current amount, and monthly savings.',
      selector: '#balance-header',
    },
    {
      id: 'balance-3',
      title: 'Applied Payments',
      description: 'View payments made this month. Click to see more information about each payment.',
      selector: '#balance-applied',
    },
    {
      id: 'balance-4',
      title: 'Navigate through Applied Payments',
      description: 'Use the navigation buttons to view more applied payments within the current month.',
      selector: '#balance-applied-pagination'
    },
    {
      id: 'balance-5',
      title: 'Pending Payments',
      description: 'View payments pending this month. Click for more info, and you can change the status to paid if you have completed the payment.',
      selector: '#balance-pending',
    },
    {
      id: 'balance-6',
      title: 'Navigate through Pending Payments',
      description: 'Use the navigation buttons to view more pending payments within the current month.',
      selector: '#balance-pending-pagination'
    }
  ],
  '/stats': [
    { id: 'stats-1', title: 'Estadísticas de Gastos', description: 'Visualiza tus gastos mensuales de manera clara.', selector: '#stats-chart' },
    { id: 'stats-2', title: 'Comparativas', description: 'Compara tus gastos a lo largo de los meses.', selector: '#stats-chart' },
  ],
};
