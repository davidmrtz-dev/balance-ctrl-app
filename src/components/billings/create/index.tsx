import { Button, DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import { theme } from "../../../Theme";
import { IBilling } from "../../../@types";

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
  const [values, setValues] = useState<IBilling>({} as IBilling);
  const [form] = Form.useForm();

  const handleCancel = () => {
    closeModal();
    setValues({} as IBilling);
    form.resetFields();
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
        <Button key="submit" type="primary" loading={loading} onClick={() => {}}>
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
        initialValues={{} as IBilling}
        onValuesChange={e => setValues({...values, ...e})}
        style={{ width: '100%' }}
      >
        <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
          Name
        </Typography.Text>}
          name='name'>
          <Input maxLength={20} style={{ ...theme.texts.brandSubFont }} />
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
