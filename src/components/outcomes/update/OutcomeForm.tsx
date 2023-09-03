import { Collapse, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { IOutcome, ICategory } from "../../../@types";
import { theme } from "../../../Theme";
import styled from "styled-components";
import Payment from "../../payment";
import { SubFontText } from "../../../atoms/text";
import BillinfInformation from "../../billing";
import { OutcomeCategory } from "../Category";
import { useEffect, useState } from "react";
import { getCategories } from "../../../api/core/Category";
import Alert from "../../alert";

const FormContentWrapper = styled.div`
  border: 1px solid ${theme.colors.grays.light};
  padding: 4px 11px;
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const { Panel } = Collapse;

export const OutcomeForm = ({
  editable,
  values,
  setValues
}: {
  editable: boolean;
  values: IOutcome;
  setValues: (values: IOutcome) => void;
}): JSX.Element => {
  const [form] = Form.useForm();

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const twentyDaysAgo = dayjs().subtract(20, 'day').startOf('day');
    return current && (current >= dayjs().endOf('day') || current < twentyDaysAgo);
  };

  return (
    <Form
      name='outcome-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label='Category' name='category'>
        <CategorySelector enableSelector={editable} category={values.categories[0] || {} as ICategory} />
      </Form.Item>
      <Form.Item label='Name' name='description'>
          {editable ? (<Input
            maxLength={50}
            style={{ ...theme.texts.brandSubFont }}
          />): (<FormContentWrapper>{values.description}</FormContentWrapper>)}
      </Form.Item>
      <Form.Item label='Amount' name='amount'>
        {editable ? (<InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as unknown as 1}
        />) : (<FormContentWrapper>{`$ ${values.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</FormContentWrapper>)}
      </Form.Item>
      {values.transaction_type === 'fixed' && (
        <Form.Item label='Quotas' name='quotas'>
          {editable ? (<Select
            style={{ width: '100%' }}
            options={[
              { value: 3, label: '3' },
              { value: 6, label: '6' },
              { value: 9, label: '9' },
              { value: 12, label: '12' },
              { value: 24, label: '24' }
            ]}
          />) : (<FormContentWrapper>{values.quotas}</FormContentWrapper>)}
        </Form.Item>
      )}
      <Form.Item label="Purchase date" name='transaction_date'>
        {editable ? (<DatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
        />) : (<FormContentWrapper>{dayjs(values.transaction_date).format('YYYY-MM-DD')}</FormContentWrapper>)}
      </Form.Item>
      <Collapse expandIconPosition='end' style={{ marginBottom: '24px' }}>
        <Panel header={SubFontText('Related Payments')} key={1}>
          {(values.payments || []).map(payment => <Payment {...payment} key={payment.id} />)}
        </Panel>
      </Collapse>
      <Form.Item label="Billing information" name='billing_information'>
        {(values.billings || []).map(billing => <BillinfInformation {...billing} key={billing.id} />)}
      </Form.Item>
    </Form>
  );
};

const CategorySelector = ({
  enableSelector,
  category
}: {
  enableSelector: boolean;
  category: ICategory;
}): JSX.Element => {
  const [selectorData, setSelectorData] =
    useState<{
      categories: ICategory[],
      options: { value: number; label: string }[]
    }>({ categories: [], options: [] });

  const fetchCategories = async () => {
    try {
      const storedCategories = localStorage.getItem('categories');

      if (storedCategories) {
        const parsedCategories = JSON.parse(storedCategories);
        const selectorOptions = parsedCategories.map((cat: ICategory) => ({ value: cat.id, label: cat.name }));
        setSelectorData({ categories: parsedCategories, options: selectorOptions });
      } else {
        const data = await getCategories();
        const selectorOptions = data.categories.map(cat => ({ value: cat.id, label: cat.name }));
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

  useEffect(() => {
    if (enableSelector && !selectorData.categories.length) {
      fetchCategories();
    }
  }, [enableSelector, selectorData.categories]);

  return (
    enableSelector ? (
      <Select
        defaultValue={category.name}
        style={{ width: '100%' }}
        options={selectorData.options}
      />
    ) : (
      <OutcomeCategory {...category} key={category.id} />
    )
  );
};
