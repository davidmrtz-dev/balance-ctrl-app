import { DatePicker, Form, Input, InputNumber, Select, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { IOutcome } from "../../../@types";
import { theme } from "../../../Theme";
import { CategorySelector } from "../categories/CategorySelector";
import { BillingSelector } from "../billings/BillingSelector";

export const OutcomeForm = ({
  values,
  setValues
}: {
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
        <CategorySelector
          enableSelector
          values={values}
          setValues={setValues}
        />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Name
      </Typography.Text>}
        name='description'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }} />
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Amount
      </Typography.Text>}
        name='amount'>
        <InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as unknown as 1}
        />
      </Form.Item>
      {values.quotas && (
        <Form.Item label='Quotas' name='quotas'>
          <Select
            style={{ width: '100%' }}
            options={[
              { value: 3, label: '3 months' },
              { value: 6, label: '6 months' },
              { value: 9, label: '9 months' },
              { value: 12, label: '12 months' },
              { value: 24, label: '24 months' }
            ]}
          />
        </Form.Item>
      )}
      <Form.Item label="Purchase date" name='transaction_date'>
        <DatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
        />
      </Form.Item>
      <BillingSelector />
    </Form>
  );
};
