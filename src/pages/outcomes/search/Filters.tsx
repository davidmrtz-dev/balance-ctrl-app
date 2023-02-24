import { Button, DatePicker, Select } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";
import dayjs from 'dayjs';
import { useState } from "react";
import { TransactionType } from "../../../@types";

const { RangePicker } = DatePicker;

const FiltersContainer = styled.div<{ visible: boolean }>`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: ${p => p.visible ? '126' : '0'}px;
	overflow: hidden;
	transition: height .5s ease-in-out;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Filters = ({
	visible,
  setDates,
  onApply,
  setType
}: {
	visible: boolean;
  setDates: (values: string []) => void;
  onApply: () => void;
  setType: (value: TransactionType | '') => void;
}): JSX.Element => {
  const [selection, setSelection] = useState<string []>(['', '']);
  const [filter, setFilter] = useState<TransactionType | ''>('');

  return(<FiltersContainer visible={visible}>
    <RangePicker
      style={{
        width: '100%',
        margin: '0 5px'
      }}
      popupStyle={{ maxWidth: 328 }}
      allowClear
      onCalendarChange={(values) => {
        if (values?.every(val => val)) {
          const from = dayjs(values[0]).format('YYYY-MM-DD');
          const to = dayjs(values[1]).format('YYYY-MM-DD');
          setSelection([from, to]);
        } else if (values === null) {
          setSelection(['', '']);
          setDates(['', '']);
          onApply();
        }
      }}
    />
    <Select
      allowClear
      onClear={() => {
        setFilter('');
        setType('');
        onApply();
      }}
      disabled={false}
      placeholder={'Type'}
      style={{
        width: '100%',
        padding: '10px 0'
      }}
      dropdownStyle={{ backgroundColor: theme.colors.grays.light }}
      onSelect={setFilter}
      options={[
        { value: 'current', label: 'Current' },
        { value: 'fixed', label: 'Fixed' }
      ]}
    />
    <Button
      disabled={selection.some(s => !s) && !filter}
      type='primary'
      onClick={() => {
        setDates(selection);
        setType(filter);
        onApply();
      }}
    >
      Apply
    </Button>
  </FiltersContainer>);
};
