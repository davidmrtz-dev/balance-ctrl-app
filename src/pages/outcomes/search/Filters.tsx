import { Button, DatePicker, Select } from "antd";
import styled from "styled-components";
import { theme } from "../../../Theme";
import dayjs from 'dayjs';
import { useEffect, useState } from "react";
import { ICategory, TransactionType } from "../../../@types";
import { getCategories } from "../../../api/core/Category";
import Alert from "../../../components/alert";

const { RangePicker } = DatePicker;

const FiltersContainer = styled.div<{ visible: boolean }>`
  background-color: ${p => p.theme.colors.grays.light};
  width: 100%;
  height: ${p => p.visible ? '158' : '0'}px;
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
  setType,
  setCategory
}: {
	visible: boolean;
  setDates: (values: string []) => void;
  setType: (value: TransactionType | '') => void;
  setCategory: (value: ICategory | null) => void;
}): JSX.Element => {
  const [selection, setSelection] = useState<string []>(['', '']);
  const [filter, setFilter] = useState<TransactionType | ''>('');
  const [selectorData, setSelectorData] =
    useState<{
      categories: ICategory[],
      options: { value: number; label: string }[]
    }>({ categories: [], options: [] });
  const [internalCategory, setInternalCategory] = useState<ICategory | null>(null);

  const fetchCategories = async () => {
    try {
      const storedCategories = localStorage.getItem('categories');

      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        const selectorOptions = parsedCategories.map((cat: ICategory) => ({ value: cat.id, label: cat.name }));
        setSelectorData({ categories: parsedCategories, options: selectorOptions });
      } else {
        const data = await getCategories();
        const selectorOptions = data.categories.map((cat: ICategory) => ({ value: cat.id, label: cat.name }));
        setSelectorData({ categories: data.categories, options: selectorOptions });

        localStorage.setItem('categories', JSON.stringify(data.categories));
      }
    } catch (error: any) {
      setTimeout(() => Alert({
        icon: 'error',
        title: 'Ops!',
        text: (error.message || 'There was an error, please try again later')
      }), 1000);
    }
  };

  const handleSelectorChange = (value: number) => {
    const category = selectorData.categories.find(cat => cat.id === value);

    if (!category) return;

    setInternalCategory(category);
  };

  useEffect(() => {
    if (!selectorData.categories.length) {
      fetchCategories();
    }
  }, [selectorData.categories]);

  return(<FiltersContainer visible={visible}>
    <RangePicker
      style={{
        width: '100%',
        margin: '0 5px'
      }}
      allowClear
      onCalendarChange={(values) => {
        if (values?.every(val => val)) {
          const from = dayjs(values[0]).format('YYYY-MM-DD');
          const to = dayjs(values[1]).format('YYYY-MM-DD');
          setSelection([from, to]);
        } else if (values === null) {
          setSelection(['', '']);
          setDates(['', '']);
        }
      }}
    />
    <Select
      allowClear
      onClear={() => {
        setFilter('');
        setType('');
      }}
      placeholder={'Type'}
      style={{
        width: '100%',
        paddingTop: '5px'
      }}
      dropdownStyle={{ backgroundColor: theme.colors.grays.light }}
      onSelect={setFilter}
      options={[
        { value: 'current', label: 'Current' },
        { value: 'fixed', label: 'Fixed' }
      ]}
    />
    <Select
      allowClear
      onClear={() => {
        setInternalCategory(null);
        setCategory(null);
      }}
      placeholder={'Category'}
      style={{ width: '100%', paddingTop: '5px', paddingBottom: '10px' }}
      onSelect={handleSelectorChange}
      options={selectorData.options}
    />
    <Button
      disabled={selection.some(s => !s) && !filter && !internalCategory}
      type='primary'
      onClick={() => {
        setDates(selection);
        setType(filter);
        setCategory(internalCategory);
      }}
    >
      Apply
    </Button>
  </FiltersContainer>);
};
