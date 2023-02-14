export const toCelsius = (n: number | undefined, fix?: number ) =>
  n ? (Math.abs(n) - 273.15).toFixed(fix || 2) : 0;

export const capitalizeFirst = (str: string) => {
  const firstLetter = str.slice(0, 1).toUpperCase();
  const rest = str.slice(1);

  return `${firstLetter}${rest}`;
};

export const parsedInt = (value = '0') => parseInt(value, 10);

export const formatDate = (date: string) =>
  date.split('-').reverse().join('-');