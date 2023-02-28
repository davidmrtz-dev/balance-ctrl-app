import { Form, Input, InputNumber, Select, Typography } from "antd";
import { IIncome } from "../../@types";
import { theme } from "../../Theme";

export const IncomeForm = ({
	values,
	setValues
}: {
	values: IIncome;
	setValues: (values: IIncome) => void;
}): JSX.Element => {
	const [form] = Form.useForm();

	return (
    <Form
      name='income-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Name
      </Typography.Text>}
        name='description'>
        <Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>
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
      {values.frequency && (
        <Form.Item label='Frequency' name='frequency'>
          <Select
            style={{ width: '100%' }}
            options={[
              { value: 0, label: 'weekly' },
              { value: 1, label: 'biweekly' },
              { value: 2, label: 'monthly' }
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