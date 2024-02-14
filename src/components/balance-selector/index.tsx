import { useCallback, useEffect, useState } from "react";
import { IBalance } from "../../@types";
import { Select } from "antd";
import Alert from "../alert";
import { getBalances } from "../../api/core/Balance";
import styled from "styled-components";
import { theme } from "../../Theme";

const Offset = styled.div`
  height: 32px;
  width: 100%;
  background-color: ${props => props.theme.colors.whites.lighter};
  margin-top: 15px;
  margin-bottom: 30px;
`;

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

  return (
    <>
      <Offset />
      <div
        style={{
          padding: '15px 0',
          position: 'fixed',
          top: 80,
          left: 0,
          right: 0,
          margin: '0 auto',
          width: '360px',
          backgroundColor: `${theme.colors.whites.lighter}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          boxShadow: `0 4px 5px -2px ${theme.colors.grays.normal}`
        }}
      >
        <Select
          style={{ width: '328px' }}
          defaultValue={selectorData.options[0].value}
          onChange={handleSelect}
          options={selectorData.options}
        />
      </div>
    </>
  );
};

export default BalanceSelector;
