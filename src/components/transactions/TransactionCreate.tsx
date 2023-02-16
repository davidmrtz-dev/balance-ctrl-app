import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { IOutcome, IOutcomeNew, TransactionType } from "../../@types";
import { newCurrentOutcome } from "../../@types/IOutcome";
import { createOutcome } from "../../api/core/Outcome";
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
  handleCreate: (outcome: IOutcome) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IOutcomeNew>(newCurrentOutcome());

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
      const outcome = await createOutcome({
        ...values
      });
      setTimeout(async () => {
        await handleCreate(outcome);
        setValues(newCurrentOutcome());
        setLoading(false);
        closeModal();
      }, 1000);
    } catch(err: any) {
      setTimeout(() => {
        Alert({
          icon: 'error',
          text: (err.error || err.errors[0] || 'There was an error, please try again.'),
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