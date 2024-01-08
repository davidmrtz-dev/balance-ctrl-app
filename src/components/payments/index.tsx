import { PaymentStatus } from '../../@types';
import { theme } from '../../Theme';

export { OutcomeDetail } from './OutcomeDetail';
export { PaymentDetail } from './PaymentDetail';
export { PaymentsNavigation } from './PaymentsNavigation';
export { Status } from './Status';

export const getPaymentStatusColor = (status: PaymentStatus) => {
  switch (status) {
    case 'hold':
      return theme.colors.grays.normal;
    case 'pending':
      return theme.colors.yellows.normal;
    case 'applied':
      return theme.colors.greens.normal;
    case 'expired':
      return theme.colors.reds.normal;
    default:
      return theme.colors.grays.light;
  };
};
