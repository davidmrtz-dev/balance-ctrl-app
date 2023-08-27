import { DatePicker, Form, Input, InputNumber, Select, Typography } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { IOutcome } from "../../../@types";
import { theme } from "../../../Theme";
import styled from "styled-components";

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
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Name
      </Typography.Text>}
        name='description'>
          {editable ? (<Input 
            maxLength={20}
            style={{ ...theme.texts.brandSubFont }}
          />): (<ContentWrapper>{values.description}</ContentWrapper>)}
      </Form.Item>
      <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
        Amount
      </Typography.Text>}
        name='amount'>
        {editable ? (<InputNumber
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as unknown as 1}
        />) : (<ContentWrapper>{`$ ${values.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</ContentWrapper>)}
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
          />) : (<ContentWrapper>{values.quotas}</ContentWrapper>)}
        </Form.Item>
      )}
      <Form.Item label="Purchase date" name='transaction_date'>
        {editable ? (<DatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
        />) : (<ContentWrapper>{dayjs(values.transaction_date).format('YYYY-MM-DD')}</ContentWrapper>)}
      </Form.Item>
    </Form>
  );
};


const ContentWrapper = styled.div`
  border: 1px solid ${theme.colors.grays.light};
  padding: 4px 11px;
  border-radius: 6px;
  height: 32px;
  display: flex;
  align-items: center;
`;
