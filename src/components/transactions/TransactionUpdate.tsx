import { Button, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { IOutcome, ICurrentOutcomeNew, TransactionType } from "../../@types";
import { createOutcome } from "../../api/core/Outcome";
import { emptyCurrentOutcome } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { TransactionForm } from "./TransactionForm";

export const TransactionUpdate = ({
  outcome,
  open,
  type,
  closeModal,
  handleUpdate
}: {
  outcome: IOutcome;
  open: boolean;
  type: TransactionType;
  closeModal: () => void;
  handleUpdate: (outcome: IOutcome) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<ICurrentOutcomeNew>(emptyCurrentOutcome());

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
      // const outcome = await createOutcome({
      //   ...values
      // });
      setTimeout(async () => {
        // await handleUpdate(outcome);
        setValues(emptyCurrentOutcome());
        setLoading(false);
        closeModal();
      }, 1000);
    } catch(err: any) {
      setTimeout(() => {
        Alert({
          icon: 'error',
          text: (err.error || err.errors[0] || 'There was an error, please try again.'),
        });
        setValues(emptyCurrentOutcome());
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(emptyCurrentOutcome());
    closeModal();
  };

  useEffect(() => {
    if (outcome) {
      setValues(outcome);
    }
  }, [outcome])

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > Update {type} outcome
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