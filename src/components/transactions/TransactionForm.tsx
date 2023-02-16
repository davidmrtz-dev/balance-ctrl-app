import { Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import { IOutcome, IOutcomeNew } from "../../@types";

export const TransactionForm = ({
  values,
  setValues
}: {
  values: IOutcomeNew | IOutcome;
  setValues: (values: IOutcomeNew | IOutcome) => void;
}): JSX.Element => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <Form
      name='new-transaction'
      form={form}
      layout='vertical'
      initialValues={{}}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label="Name" rules={[{ required: true, message: 'Please provide a description.' }]} name='description'>
        <Input maxLength={20} />
      </Form.Item>
      <Form.Item label='Amount' rules={[{ required: true, message: 'Please provide an amount.' }]} name='amount'>
        <InputNumber
          min={0}
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as unknown as 0}
        />
      </Form.Item>
      {/* <Form.Item label="Purchase date" rules={[{ required: true, message: 'Please provide a date.' }]} name='purchase_date'>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item> */}
    </Form>
  );
};