import { Button, Form, Modal } from "antd";
import { FormItemWrapper, TitleWrapper } from "../containers";
import { FontText } from "../../atoms/text";
import { IOutcome, IPayment } from "../../@types";
import { capitalizeFirst, formatCurrency } from "../../utils";
import { OutcomeDetail } from "./OutcomeDetail";
import { Status } from "./Status";
import styled from "styled-components";
import { theme } from "../../Theme";
import { useCallback, useState } from "react";
import { updatePayment } from "../../api/core/Payment";
import Alert from "../alert";
import dayjs from "dayjs";

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
  setPayment,
  open,
  close,
  setRefresh
}: {
  payment: IPayment;
  setPayment: (payment: IPayment | null) => void;
  open: boolean;
  close: () => void;
  setRefresh?: (refresh: boolean) => void;
}): JSX.Element => {
  const [confirm, setConfirm] = useState(false);

  const handleSubmitUpdate = useCallback(async () => {
    try {
      const updatedPayment = await updatePayment({
        ...payment,
        status: 'applied',
        paid_at: dayjs().format('YYYY-MM-DDTHH:mm:ss[Z]')
      });
      setTimeout(async () => {
        setRefresh && setRefresh(true);
        setPayment(updatedPayment);
        Alert({
          icon: 'success',
          text: 'Payment status updated successfully'
        });
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.')
        });
      }, 1000);
    }
  }, [payment, setPayment, setRefresh]);


  const footerComponents = [
    <Button
      key="cancel"
      onClick={() => close()}
    >
      {FontText('Close')}
    </Button>
  ];

  if (payment.status === 'pending') {
    footerComponents.unshift(
      <Button
        key="submit"
        type="primary"
        onClick={() => setConfirm(true)}
        style={{ backgroundColor: theme.colors.yellows.normal }}
      >
        {FontText('Apply', { color: theme.colors.whites.normal })}
      </Button>
    );
  }

  if (confirm) Alert({
    icon: 'warning',
    text: 'Are you sure you want to apply this payment?',
    showCancelButton: true
  }).then(result => {
    setConfirm(false);
    if (result.isConfirmed) {
      handleSubmitUpdate();
    }
  });

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
        {payment.paid_at && (<Form.Item label='Paid At' name='paid_at'>
          <FormItemWrapper>{dayjs(payment.paid_at).format('YYYY-MM-DD HH:mm:ss')}</FormItemWrapper>
        </Form.Item>)}
        <Form.Item label='Folio' name='folio'>
          <FormItemWrapper>{payment.folio}</FormItemWrapper>
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
