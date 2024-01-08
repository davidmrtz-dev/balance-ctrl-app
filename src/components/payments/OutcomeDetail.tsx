import { Form } from "antd";
import dayjs from "dayjs";
import { IOutcome } from "../../@types";
import { theme } from "../../Theme";
import { Billing } from "../outcomes/billings/Billing";
import { CategorySelector } from "../outcomes";
import { capitalizeFirst } from "../../utils";
import { Status } from "../outcomes/Status";
import { FormItemWrapper } from "../containers";

export const OutcomeDetail = ({
  values,
}: {
  values: IOutcome;
}): JSX.Element => {
  return (
    <Form
      name='outcome-payment-form'
      layout='vertical'
      initialValues={values}
      style={{
        width: '100%',
        borderRadius: '10px',
        border: `1px solid ${theme.colors.grays.light}`,
        padding: '10px'
      }}
    >
      <Form.Item label='Category' name='category'>
        <CategorySelector
          enableSelector={false}
          values={values}
          setValues={() => {}}
        />
      </Form.Item>
      <Form.Item label='Name' name='description'>
        <FormItemWrapper>{values.description}</FormItemWrapper>
      </Form.Item>
      <Form.Item label='Purchase Status' name='status'>
        <FormItemWrapper style={{ justifyContent: 'space-between'}}>
          {capitalizeFirst(values.status)}
          <Status status={values.status} />
        </FormItemWrapper>
      </Form.Item>
      <Form.Item label='Purchase Amount' name='amount'>
        <FormItemWrapper>{`$ ${values.amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</FormItemWrapper>
      </Form.Item>
      <Form.Item label="Purchase date" name='transaction_date'>
        <FormItemWrapper>{dayjs(values.transaction_date).format('YYYY-MM-DD')}</FormItemWrapper>
      </Form.Item>
      <Form.Item label='Payment Method' name='payment_method'>
        {(values.billings || []).map(billing => <Billing billing={billing} key={billing.id} />)}
      </Form.Item>
    </Form>
  );
};
