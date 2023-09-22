import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { IOutcome, TransactionType } from "../../../@types";
import { createOutcome } from "../../../api/core/Outcome";
import { theme } from "../../../Theme";
import Alert from "../../alert";
import { OutcomeForm } from "./OutcomeForm";
import { newOutcome } from '../../../generators/emptyObjects/index';
import dayjs from "dayjs";

const OutcomeCreate = ({
  open,
  type,
  closeModal,
  handleCreate
}: {
  open: boolean;
  type: TransactionType;
  closeModal: () => void;
  handleCreate: (outcome: IOutcome) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IOutcome>(newOutcome(type));

  const handleSubmit = async () => {
    let valid = true;
    let errorText = '';
    if (Object.values(values).some(val => val === '')) {
      valid = false;
      errorText = 'All fields are required';
    } else if (
      values.categories.length === 0 ||
      values.billings.length === 0
    ) {
      valid = false;
      errorText = 'You must have to select a category and a payment method'
    }

    Alert({
      icon: 'error',
      text: errorText
    });

    if (!valid) return;

    setLoading(true);

    try {
      const outcome = await createOutcome({
        ...values,
        transaction_date: dayjs(values.transaction_date).format('YYYY-MM-DD'),
        category_id: values.categories[0].id,
        billing_id: values.billings[0].id
      } as IOutcome);
      setTimeout(async () => {
        await handleCreate(outcome);
        setValues(newOutcome(type));
        setLoading(false);
        closeModal();
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setValues(newOutcome(type));
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newOutcome(type));
    closeModal();
  };

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > New {type} outcome
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
      <OutcomeForm
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};

export default OutcomeCreate;
