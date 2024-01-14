import { Collapse, DatePicker, Form, Input, InputNumber, Select, Tooltip } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { IOutcome } from "../../../@types";
import { theme } from "../../../Theme";
import styled from "styled-components";
import { Payment } from "../Payment";
import { Billing } from "../billings/Billing";
import { SubFontText } from "../../../atoms/text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CategorySelector, BillingSelector } from "..";
import { capitalizeFirst } from "../../../utils";
import { Status } from "../Status";
import { FormItemWrapper } from "../../containers";

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
      name='outcome-update-form'
      form={form}
      layout='vertical'
      initialValues={values}
      onValuesChange={e => setValues({...values, ...e})}
      style={{ width: '100%' }}
    >
      <Form.Item label='Category' name='category'>
        <CategorySelector
          enableSelector={editable}
          values={values}
          setValues={setValues}
        />
      </Form.Item>
      <Form.Item label='Name' name='description'>
        {editable ? (<Input
          maxLength={50}
          style={{ ...theme.texts.brandSubFont }}
        />) : (<FormItemWrapper>{values.description}</FormItemWrapper>)}
      </Form.Item>
      <Form.Item label='Status' name='status'>
        <FormItemWrapper style={{ justifyContent: 'space-between'}}>
          {capitalizeFirst(values.status)}
          <Status status={values.status} />
        </FormItemWrapper>
      </Form.Item>
      <Form.Item label={
          <span>
            Amount
            {(values.transaction_type === 'fixed' && editable) && <Tooltip title="Once a credit paid purchase is created, it is not possible to change the amount">
              <FontAwesomeIcon icon={faInfoCircle} style={{ padding: '0 5px'}} size="1x" />
            </Tooltip>}
          </span>
        } name='amount'>
        {editable ? (<InputNumber
          disabled={values.transaction_type === 'fixed'}
          min={1}
          style={{ width: '100%', ...theme.texts.brandSubFont }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as unknown as 1}
        />) : (<FormItemWrapper>{`$ ${values.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</FormItemWrapper>)}
      </Form.Item>
      {values.transaction_type === 'fixed' && (
        <Form.Item label={
          <span>
            Payments
            {editable && <Tooltip title="Once a credit paid purchase is created, it is not possible to change the number of payments">
              <FontAwesomeIcon icon={faInfoCircle} style={{ padding: '0 5px'}} size="1x" />
            </Tooltip>}
          </span>
        } name='quotas'>
          {editable ? (<Select
            disabled
            style={{ width: '100%' }}
            options={[
              { value: 3, label: '3' },
              { value: 6, label: '6' },
              { value: 9, label: '9' },
              { value: 12, label: '12' },
              { value: 24, label: '24' }
            ]}
          />) : (<FormItemWrapper>{values.quotas}</FormItemWrapper>)}
        </Form.Item>
      )}
      <Form.Item label="Purchase date" name='transaction_date'>
        {editable ? (<DatePicker
          style={{ width: '100%' }}
          disabledDate={disabledDate}
        />) : (<FormItemWrapper>{dayjs(values.transaction_date).format('YYYY-MM-DD')}</FormItemWrapper>)}
      </Form.Item>
      <Collapse expandIconPosition='end' style={{ marginBottom: '24px' }}>
        <Panel header={SubFontText('Related Payments')} key={1}>
          <PaymentsContainer>
            {(values.payments || []).map(payment => <Payment {...payment} key={payment.id} />)}
          </PaymentsContainer>
        </Panel>
      </Collapse>
      <Form.Item label={
          <span>
            Payment Method
            {(values.transaction_type === 'fixed' && editable) && <Tooltip title="Once a credit paid purchase is created, it is not possible to change the payment method">
              <FontAwesomeIcon icon={faInfoCircle} style={{ padding: '0 5px'}} size="1x" />
            </Tooltip>}
          </span>
        } name='payment_method'>
        {(values.billings || []).map(billing => <Billing billing={billing} key={billing.id} />)}
      </Form.Item>
      {(values.transaction_type === 'current' && editable) && <BillingSelector values={values} setValues={setValues} /> }
    </Form>
  );
};

const PaymentsContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;
