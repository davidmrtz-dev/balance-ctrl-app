import { faCreditCard, faDollarSign, faMoneyBill, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Variation } from "../@types";

export const toCelsius = (n: number | undefined, fix?: number ) =>
  n ? (Math.abs(n) - 273.15).toFixed(fix || 2) : 0;

export const capitalizeFirst = (str: string) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  const rest = str.slice(1);

  return `${firstLetter}${rest}`;
};

export const parsedInt = (value = '0') => parseInt(value, 10);

export const billingIcon = (billingType: string) => {
  switch (billingType) {
    case 'cash':
      return faDollarSign;
    case 'credit':
      return faCreditCard;
    case 'debit':
      return faMoneyBill;
    default:
      return faQuestion;
  }
};

export const formatCurrency = (amount: string | null | undefined) => {
  if (!amount) {
    return '$0.00';
  }

  const fAmount = parseFloat(amount);

  return fAmount.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const analyticsColor = (percentage: string): Variation => {
  if (!percentage) return 'gray';

  return percentage.includes('-') ? 'red' : 'green';
}
