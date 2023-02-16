export const toCelsius = (n: number | undefined, fix?: number ) =>
  n ? (Math.abs(n) - 273.15).toFixed(fix || 2) : 0;

export const capitalizeFirst = (str: string) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  const rest = str.slice(1);

  return `${firstLetter}${rest}`;
};

export const parsedInt = (value = '0') => parseInt(value, 10);

export const formatCurrency = (value: string) => new Intl.NumberFormat('en-US',
  { style: 'currency', currency: 'USD' }
).format(parseFloat(value));

export const formatViewDate = (date: string) =>
  date.split('-').reverse().join('-');

const padTo2Digits = (num: number) =>
  num.toString().padStart(2, '0');

export const formatDate = (date: Date) => [
  padTo2Digits(date.getDate()),
  padTo2Digits(date.getMonth() + 1),
  date.getFullYear(),
].join('/');