import { Button, DatePicker, Form, Input, Modal, Select, Typography } from "antd";
import { useState } from "react";
import { theme } from "../../../Theme";
import Alert from "../../alert";
import { IBilling } from "../../../@types";
import { FontText } from "../../../atoms/text";
import { capitalizeFirst } from "../../../utils";
import { FormItemWrapper, TitleWrapper } from "../../containers";
import dayjs from "dayjs";
import { deleteBilling, updateBilling } from "../../../api/core/Billing";

const BillingUpdate = ({
  billing,
  open,
  closeModal,
  handleUpdate,
  handleDelete
}: {
  billing: IBilling;
  open: boolean;
  closeModal: () => void;
  handleUpdate: (category: IBilling) => void;
  handleDelete?: (id: number) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [values, setValues] = useState<IBilling>(billing);
  const [enableEdit, setEnableEdit] = useState(false);
  const [form] = Form.useForm();

  const handleSumbitUpdate = async () => {
    if (Object.values(values).some(val => val === '' || val === null)) {
      Alert({
        icon: 'error',
        text: 'All fields are required'
      });

      return;
    }

    setLoading(true);

    try {
      const updatedCategory = await updateBilling(
        values.id,
        {
          ...values,
          cycle_end_date: dayjs(values.cycle_end_date).format('YYYY-MM-DD'),
          payment_due_date: dayjs(values.payment_due_date).format('YYYY-MM-DD')
      });
      setTimeout(async () => {
        handleUpdate(updatedCategory);
        setValues(updatedCategory);
        form.resetFields();
        setEnableEdit(false);
        setLoading(false);
        Alert({
          icon: 'success',
          text: 'Payment method successfully updated'
        })
      }, 1000);
    } catch (err: any) {
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

  const handleSubmitDelete = async () => {
    setDeleting(true);

    try {
      await deleteBilling(billing.id);
      setTimeout(async () => {
        handleDelete && await handleDelete(billing.id);
        setDeleting(false);
        closeModal();
        Alert({
          icon: 'success',
          text: 'Purchase method deleted successfully'
        });
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length &&
          Array.isArray(err.errors) ? err.errors.join(', ') : err.errors;

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setDeleting(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    closeModal();
    setEnableEdit(false);
    form.resetFields();
  };

  const footerComponents = [
    <Button
      key="cancel"
      onClick={enableEdit ? () => setEnableEdit(false) : handleCancel}
      disabled={loading || deleting}
    >
      {FontText(`${enableEdit ? 'Cancel' : 'Close'}`)}
    </Button>
  ];

  if (confirmDeletion) Alert({
    icon: 'warning',
    text: 'Are you sure you want to delete this transaction?',
    showCancelButton: true
  }).then(result => {
    setConfirmDeletion(false);
    if (result.isConfirmed) {
      handleSubmitDelete();
    }
  });

  if (enableEdit) {
    if (handleDelete) {
      footerComponents.unshift(<Button style={{
        backgroundColor: theme.colors.warning
      }}
        key="delete"
        onClick={() => setConfirmDeletion(true)}
        disabled={loading}
        loading={deleting}
      >
        {FontText('Delete', { color: theme.colors.whites.normal })}
    </Button>);
    }

    footerComponents.unshift(
      <Button
        key="submit"
        type="primary"
        loading={loading}
        onClick={handleSumbitUpdate}
      >
        {FontText('Update', { color: theme.colors.whites.normal })}
      </Button>
    );
  }

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<TitleWrapper>
        {FontText('Category details', { fontWeight: 'normal' })}
        <Button
          key="edit"
          onClick={() => setEnableEdit(true)}
          style={{ backgroundColor: enableEdit ? theme.colors.grays.normal : theme.colors.blues.normal }}
          disabled={enableEdit}
        >
          {FontText('Edit', { color: theme.colors.whites.normal })}
        </Button>
      </TitleWrapper>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      <Form
        name='billing-update-form'
        form={form}
        layout='vertical'
        initialValues={{...values, cycle_end_date: dayjs(values.cycle_end_date), payment_due_date: dayjs(values.payment_due_date)}}
        onValuesChange={e => setValues({...values, ...e})}
        style={{ width: '100%' }}
        >
          <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
            Name
          </Typography.Text>}
            name='name'>
              {enableEdit
                ? (<Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>)
                : (<FormItemWrapper>{values.name}</FormItemWrapper>)}
          </Form.Item>
          <Form.Item label={<Typography.Text style={{ ...theme.texts.brandSubFont }}>
            Credit card number
          </Typography.Text>}
            name='credit_card_number'>
              {enableEdit
                ? (<Input maxLength={20} style={{ ...theme.texts.brandSubFont }}/>)
                : (<FormItemWrapper>{values.credit_card_number}</FormItemWrapper>)}
          </Form.Item>
          <Form.Item label="Cycle end date" name='cycle_end_date'>
            {enableEdit
              ? (<DatePicker disabled={!enableEdit} style={{ width: '100%' }} />)
              : (<FormItemWrapper>{dayjs(values.cycle_end_date).format('YYYY-MM-DD')}</FormItemWrapper>)}
          </Form.Item>
          <Form.Item label="Payment due date" name='payment_due_date'>
            {enableEdit
            ? (<DatePicker disabled={!enableEdit} style={{ width: '100%' }} />)
            : (<FormItemWrapper>{dayjs(values.payment_due_date).format('YYYY-MM-DD')}</FormItemWrapper>)}
          </Form.Item>
          <Form.Item label='Type' name='billing_type'>
            {enableEdit
              ? (<Select
              disabled={!enableEdit}
              style={{ width: '100%' }}
              options={[
                { value: 'credit', label: 'Credit' },
                { value: 'debit', label: 'Debit' },
                { value: 'cash', label: 'Cash' }
              ]}
            />)
            : (<FormItemWrapper>{capitalizeFirst(values.billing_type)}</FormItemWrapper>)}
          </Form.Item>
        </Form>
    </Modal>
  );
};

export default BillingUpdate;
