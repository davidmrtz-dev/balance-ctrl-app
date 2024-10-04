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
      description: 'Use the navigation buttons to view other purchases within the current month.',
      selector: '#home-current-outcomes-pagination'
    },
    {
      id: 'dashboard-5',
      title: 'Credit Purchases',
      description: 'View active credit purchases, sorted by the most recent. Click on a purchase for more details.',
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
      description: 'Use the navigation buttons to view more active purchases.',
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
    {
      id: 'stats-1',
      title: 'Stats Selector',
      description: 'View analyses and statistics for the current month with the option to select previous months.',
      selector: '#stats-selector',
    },
    {
      id: 'stats-2',
      title: 'Stats Information',
      description: 'Visualize relevant information about the month\'s data, such as income, payments, applied payments, pending payments, current amount, and monthly savings.',
      selector: '#stats-header',
    },
    {
      id: 'stats-3',
      title: 'Pie Chart',
      description: 'This chart shows the distribution of income and payments for the selected month.',
      selector: '#stats-pie-chart',
    },
    {
      id: 'stats-4',
      title: 'Line Chart',
      description: 'This chart displays the trend of income and payments for the selected month.',
      selector: '#stats-line-chart',
    },
    {
      id: 'stats-5',
      title: 'Polar Chart',
      description: 'This chart illustrates the distribution of income and payments for the selected month.',
      selector: '#stats-polar-chart',
    },
    {
      id: 'stats-6',
      title: 'Bar Chart (Expenses vs. Income)',
      description: 'This chart compares expenses and income for the selected month.',
      selector: '#stats-bar-chart-a',
    },
    {
      id: 'stats-7',
      title: 'Bar Chart (Fixed vs. Variable Expenses)',
      description: 'This chart compares fixed expenses and variable expenses for the selected month.',
      selector: '#stats-bar-chart-b',
    }
  ],
  '/outcomes': [
    {
      id: 'outcomes-1',
      title: 'Purchases Overview',
      description: 'In this section, you can view all purchases made, including cash, debit, and credit purchases.',
      selector: '#outcomes-header',
    },
    {
      id: 'outcomes-2',
      title: 'Add a New Purchase',
      description: 'Click the “+” button to add a new purchase. Fill in the details and click “Create” to add the purchase. You can also cancel the operation.',
      selector: '#outcomes-add',
    },
    {
      id: 'outcomes-3',
      title: 'Search for Purchases',
      description: 'Use the search bar to find specific purchases by name, date of purchase, type or category.',
      selector: '#outcomes-search',
    },
    {
      id: 'outcomes-4',
      title: 'Purchase History',
      description: 'View all purchases made, sorted by the most recent. Click on a purchase for more details. In the details view, you can also edit the purchase.',
      selector: '#outcomes-list',
    }
  ],
  '/incomes': [
    {
      id: 'incomes-1',
      title: 'Incomes Overview',
      description: 'In this section, you can view all incomes received, including salaries, bonuses, and other income sources.',
      selector: '#incomes-header',
    },
    {
      id: 'incomes-2',
      title: 'Add a New Income',
      description: 'Click the “+” button to add a new income. Fill in the details and click “Create” to add the income. You can also cancel the operation.',
      selector: '#incomes-add',
    },
    {
      id: 'incomes-3',
      title: 'Income History',
      description: 'View all incomes received, sorted by the most recent. Click on an income for more details. In the details view, you can also edit the income.',
      selector: '#incomes-list',
    }
  ],
  '/billings': [
    {
      id: 'billings-1',
      title: 'Payment Methods Overview',
      description: 'In this section, you can view all billings, including utilities, rent, and other recurring expenses.',
      selector: '#billings-header',
    },
    {
      id: 'billings-2',
      title: 'Add a New Payment Method',
      description: 'Click the “+” button to add a new billing. Fill in the details and click “Create” to add the billing. You can also cancel the operation.',
      selector: '#billings-add',
    },
    {
      id: 'billings-3',
      title: 'Payment Method History',
      description: 'View all billings, sorted by the most recent. Click on a billing for more details. In the details view, you can also edit the billing.',
      selector: '#billings-list',
    }
  ],
  '/categories': [
    {
      id: 'categories-1',
      title: 'Categories Overview',
      description: 'In this section, you can view all categories, including food, transportation, and other expense categories.',
      selector: '#categories-header',
    },
    {
      id: 'categories-2',
      title: 'Add a New Category',
      description: 'Click the “+” button to add a new category. Fill in the details and click “Create” to add the category. You can also cancel the operation.',
      selector: '#categories-add',
    },
    {
      id: 'categories-3',
      title: 'Category History',
      description: 'View all categories, sorted by the most recent. Click on a category for more details. In the details view, you can also edit the category.',
      selector: '#categories-list',
    }
  ]
};
