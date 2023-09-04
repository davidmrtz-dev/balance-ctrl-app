import { Collapse, DatePicker, Form, Input, InputNumber, Select, Tooltip } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { IOutcome } from "../../../@types";
import { theme } from "../../../Theme";
import styled from "styled-components";
import Payment from "../../payment";
import { SubFontText } from "../../../atoms/text";
import BillinfInformation from "../../billing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { CategorySelector } from "../CategorySelector";

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
        <Form.Item label={
          <span>
            Payments
            <Tooltip title="Once a fixed outcome is created, it is not possible to change the number of payments">
              <FontAwesomeIcon icon={faInfoCircle} style={{ padding: '0 5px'}} size="1x" />
            </Tooltip>
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
