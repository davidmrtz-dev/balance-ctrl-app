import { useCallback, useEffect, useState } from "react";
import { IBalance } from "../../@types";
import { Select } from "antd";
import Alert from "../alert";
import { getBalances } from "../../api/core/Balance";

const formatSelectorLabel = (balance: IBalance): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formattedMonth = monthNames[balance.month - 1];
  const formattedYear = balance.year;

  return `${formattedMonth} ${formattedYear}`;
};

const BalanceSelector = ({
  handleBalance
}: {
  handleBalance: (balance: IBalance) => void;
}): JSX.Element => {
  const [selectorData, setSelectorData] =
    useState<{
      balances: IBalance[],
      options: { value: number; label: string }[]
    }>({ balances: [], options: [] });

  const fetchBalances = useCallback(async () => {
    try {
      const data = await getBalances();
      const selectorOptions = data.balances.map((bal: IBalance) => ({ value: bal.id, label: formatSelectorLabel(bal) }));
      setSelectorData({ balances: data.balances, options: selectorOptions });
      handleBalance(data.balances[0]);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
      }, 1000);
    }
  }, [handleBalance]);

  const handleSelect = (value: number) => {
    const balance = selectorData.balances.find((b: IBalance) => b.id === value);
    if (balance) handleBalance(balance);
  }

  useEffect(() => {
    if (!selectorData.balances.length) {
      fetchBalances();
    }
  }, [selectorData, fetchBalances]);

  if (!selectorData.balances.length) return <></>;

  return (<Select
    defaultValue={selectorData.options[0].value}
    onChange={handleSelect}
    style={{ width: '100%', margin: '8px 0' }}
    options={selectorData.options}
  />);
};

export default BalanceSelector;
