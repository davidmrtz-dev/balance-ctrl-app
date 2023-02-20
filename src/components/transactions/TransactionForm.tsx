import { Form, Input, InputNumber, Select } from "antd";
import { IOutcome } from "../../@types";

export const TransactionForm = ({
  values,
  setValues
}: {
  values: IOutcome;
  setValues: (values: IOutcome) => void;
}): JSX.Element => {
  const [form] = Form.useForm();

  return (
    <Form
      name='new-transaction'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label="Name" name='description'>
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item label='Amount' name='amount'>
        <InputNumber
          min={1}
          style={{ width: '100%' }}
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
      {/* <Form.Item label="Purchase date" name='purchase_date'>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item> */}
    </Form>
  );
};