import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { ICurrentOutcomeNew, TransactionType } from "../../@types";
import { createOutcome } from "../../api/core/Outcome";
import { newCurrentOutcome } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { TransactionForm } from "./TransactionForm";

export const TransactionCreate = ({
  open,
  type,
  closeModal,
  handleCreate
}: {
  open: boolean;
  type: TransactionType;
  closeModal: () => void;
  handleCreate: () => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<ICurrentOutcomeNew>(newCurrentOutcome());

  const handleSubmit = async() => {
    if (Object.values(values).some(val => val === '')) {
      Alert({
        icon: 'error',
        text: 'All fields are required',
      });
      return;
    }

    setLoading(true);

    try {
      await createOutcome({
        ...values
      });
      setTimeout(async () => {
        await handleCreate();
        setValues(newCurrentOutcome());
        setLoading(false);
        closeModal();
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again.'),
        });
        setValues(newCurrentOutcome());
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newCurrentOutcome());
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
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
          Submit
        </Button>
      ]}
    >
      <TransactionForm
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};