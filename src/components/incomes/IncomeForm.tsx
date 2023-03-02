import { DatePicker, Form, Input, InputNumber, Select, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
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

  const handleValuesChange = (e: any) => {
    if (e.transaction_date) {
      setValues({...values, transaction_date: dayjs(e.transaction_date).format('YYYY-MM-DD') })
    } else {
      setValues({...values, ...e})
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const twentyDaysAgo = dayjs().subtract(20, 'day').startOf('day');
    return current && (current >= dayjs().endOf('day') || current < twentyDaysAgo);
  };

	return (
    <Form
      name='income-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={handleValuesChange}
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
              { value: 'weekly', label: 'Weekly' },
              { value: 'biweekly', label: 'Biweekly' },
              { value: 'monthly', label: 'Monthly' }
            ]}
          />
        </Form.Item>
      )}
      <Form.Item label="Most recent income date" name='transaction_date'>
        <DatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
        />
      </Form.Item>
    </Form>
  );
};