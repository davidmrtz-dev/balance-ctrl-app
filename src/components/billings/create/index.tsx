import { Button, DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import { useState } from "react";
import { theme } from "../../../Theme";
import { IBilling } from "../../../@types";
import Alert from "../../alert";
import { createBilling } from "../../../api/core/Billing";
import { emptyBilling } from "../../../generators/emptyObjects";

const BillingCreate = ({
  open,
  closeModal,
  handleCreate
}: {
  open: boolean;
  closeModal: () => void;
  handleCreate: (billing: IBilling) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IBilling>(emptyBilling());
  const [form] = Form.useForm();

  const handleCancel = () => {
    closeModal();
    setValues(emptyBilling());
    form.resetFields();
  };

  const handleSubmit = async () => {
    if (Object.values(values).some(val => val === '' || val === null)) {
      Alert({
        icon: 'error',
        text: 'All fields are required'
      });

      return;
    }

    setLoading(true);

    try {
      const billing = await createBilling(values);
      setTimeout(async () => {
        handleCreate(billing);
        setValues(emptyBilling());
        form.resetFields();
        setLoading(false);
        closeModal();
        Alert({
          icon: 'success',
          text: 'Payment method successfully added'
        });
      }, 1000);
    } catch(err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length &&
          Array.isArray(err.errors) ? err.errors.join(', ') : err.errors;

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > New payment method
        </Typography.Text>}
      style={{
        maxWidth: 360
      }}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={loading}>
          <Typography.Text style={{ ...theme.texts.brandFont }}>
            Cancel
          </Typography.Text>
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          <Typography.Text
            style={{ ...theme.texts.brandFont, color: theme.colors.whites.normal }}
          >
            Create
          </Typography.Text>
        </Button>
      ]}
    >
      <Form
        name='billing-create-form'
        form={form}
        layout='vertical'
        initialValues={emptyBilling()}
        onValuesChange={e => setValues({...values, ...e})}
        style={{ width: '100%' }}
      >
        <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
          Name
        </Typography.Text>}
          name='name'>
          <Input maxLength={20} style={{ ...theme.texts.brandSubFont }} />
        </Form.Item>
        <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
          Credit card number
        </Typography.Text>}
          name='credit_card_number'>
          <Input maxLength={19} style={{ ...theme.texts.brandSubFont }} />
        </Form.Item>
        <Form.Item label="Cycle end date" name='cycle_end_date'>
          <DatePicker
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Payment due date" name='payment_due_date'>
          <DatePicker
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label='Type' name='billing_type'>
          <Select
            style={{ width: '100%' }}
            options={[
              { value: 'credit', label: 'Credit' },
              { value: 'debit', label: 'Debit' },
              { value: 'cash', label: 'Cash' }
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BillingCreate;
