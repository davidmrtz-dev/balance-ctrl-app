import { Button, Form, Modal } from "antd";
import { FormItemWrapper, TitleWrapper } from "../containers";
import { FontText } from "../../atoms/text";
import { IOutcome, IPayment } from "../../@types";
import { capitalizeFirst, formatCurrency } from "../../utils";
import { OutcomeDetail } from "./OutcomeDetail";
import { Status } from "./Status";
import styled from "styled-components";

const Circle = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${p => p.theme.colors.blues.normal};
  color: #fff;
  border-radius: 50%;
  padding: 5px 10px;
`;

export const PaymentDetail = ({
  payment,
  open,
  close,
}: {
  payment: IPayment;
  open: boolean;
  close: () => void;
}): JSX.Element => {
  const footerComponents = [
    <Button
      key="cancel"
      onClick={() => close()}
    >
      {FontText('Close')}
    </Button>
  ];

  return(
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<TitleWrapper>
        {FontText('Payment details', { fontWeight: 'normal' })}
        <Circle>{payment.payment_number}</Circle>
      </TitleWrapper>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      <Form
        name='payment-form'
        layout='vertical'
        style={{ width: '100%' }}
      >
        <Form.Item label='Payment Amount' name='amount'>
          <FormItemWrapper>{formatCurrency(payment.amount)}</FormItemWrapper>
        </Form.Item>
        <Form.Item label='Payment Status' name='status'>
          <FormItemWrapper style={{ justifyContent: 'space-between'}}>
            {capitalizeFirst(payment.status)}
            <Status status={payment.status} />
          </FormItemWrapper>
        </Form.Item>
        <Form.Item label='Purchase' name='purchase'>
          <OutcomeDetail
            values={payment.paymentable as IOutcome}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
