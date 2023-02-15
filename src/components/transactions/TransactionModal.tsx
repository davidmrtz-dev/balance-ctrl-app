import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { IOutcome, IOutcomeNew, TransactionType } from "../../@types";
import { newOutcome } from "../../@types/IOutcome";
import { createOutcome } from "../../api/core/Outcome";
import { theme } from "../../Theme";
import Alert from "../alert";
import { TransactionForm } from "./";

export const TransactionModal = ({
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
  const [values, setValues] = useState<IOutcomeNew>(newOutcome(type));

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
        setValues(newOutcome(type));
        setLoading(false);
        closeModal();
      }, 1000);
    } catch(err: any) {
      setTimeout(() => {
        Alert({
          icon: 'error',
          text: (err.error || err.errors[0] || 'There was an error, please try again.'),
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