import { Button, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { IOutcome } from "../../@types";
import { updateOutcome } from "../../api/core/Outcome";
import { theme } from "../../Theme";
import Alert from "../alert";
import { TransactionForm } from "./TransactionForm";

export const TransactionUpdate = ({
  outcome,
  open,
  closeModal,
  handleUpdate
}: {
  outcome: IOutcome;
  open: boolean;
  closeModal: () => void;
  handleUpdate: (outcome: IOutcome) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IOutcome>({} as IOutcome);

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
      const outcome = await updateOutcome({
        ...values
      });
      setTimeout(async () => {
        await handleUpdate(outcome);
        setValues({} as IOutcome);
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
        setValues({} as IOutcome);
        setLoading(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues({} as IOutcome);
    closeModal();
  };

  useEffect(() => {
    setValues(outcome);
  }, [outcome]);

  return (
    <Modal
      destroyOnClose
      maskClosable={false}
      closable={false}
      open={open}
      title={<Typography.Text
        style={{...theme.texts.brandFont, fontWeight: 'normal'}}
        > Update {outcome.transaction_type} outcome
        </Typography.Text>}
      style={{
        maxWidth: 360,
        position: 'relative'
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
            Update
          </Typography.Text>
        </Button>
      ]}
    >
      <>
        <TransactionForm
          values={values}
          setValues={setValues}
        />
      </>
    </Modal>
  );
};