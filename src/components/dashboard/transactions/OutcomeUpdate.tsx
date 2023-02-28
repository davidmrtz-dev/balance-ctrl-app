import { Button, Modal, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { IOutcome, TransactionType } from "../../../@types";
import { deleteOutcome, updateOutcome } from "../../../api/core/Outcome";
import { newOutcome } from "../../../generators/emptyObjects";
import { theme } from "../../../Theme";
import Alert from "../../alert";
import { OutcomeForm } from "./OutcomeForm";

export const OutcomeUpdate = <T,>({
  outcome,
  open,
  type,
  closeModal,
  handleUpdate,
  handleDelete
}: {
  outcome: IOutcome;
  open: boolean;
  type: TransactionType;
  closeModal: () => void;
  handleUpdate: (outcome: T) => Promise<void>;
  handleDelete?: (id: number) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState<IOutcome>(newOutcome(type));

  const handleSubmitUpdate = useCallback(async () => {
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
      } as IOutcome);
      setTimeout(async () => {
        await handleUpdate(outcome as T);
        setValues(newOutcome(type));
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
        setValues(newOutcome(type));
        setLoading(false);
        closeModal();
      }, 1000);
    }
  }, [closeModal, handleUpdate, values, type]);

  const handleSubmitDelete = async () => {
    setDeleting(true);
    try {
      await deleteOutcome(outcome.id);
      setTimeout(async () => {
        handleDelete && handleDelete(outcome.id);
        setValues(newOutcome(type));
        setDeleting(false);
        closeModal();
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again.'),
        });
        setValues(newOutcome(type));
        setDeleting(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newOutcome(type));
    closeModal();
  };

  useEffect(() => {
    setValues(outcome);
  }, [outcome]);

  const footerComponents = [
    <Button
      key="cancel"
      onClick={handleCancel}
      disabled={loading || deleting}
    >
      <Typography.Text style={{ ...theme.texts.brandFont }}>
        Cancel
      </Typography.Text>
    </Button>,
    <Button
      key="submit"
      type="primary"
      loading={loading}
      disabled={deleting}
      onClick={handleSubmitUpdate}
      style={{ backgroundColor: theme.colors.blues.normal }}
    >
      <Typography.Text style={{
        ...theme.texts.brandFont,
        color: theme.colors.whites.normal
      }}
      >
        Update
      </Typography.Text>
    </Button>
  ];

  if (handleDelete) {
    footerComponents.push(<Button style={{
      backgroundColor: theme.colors.warning
    }}
      key="delete"
      onClick={() => setConfirm(true)}
      disabled={loading}
      loading={deleting}
    >
    <Typography.Text
      style={{
        ...theme.texts.brandFont,
        color: theme.colors.whites.normal
      }}
    >
      Delete
    </Typography.Text>
  </Button>);
  }

  if (confirm) Alert({
    icon: 'warning',
    text: 'Are you sure you want to delete this transaction?',
    showCancelButton: true
  }).then(result => {
    setConfirm(false);
    if (result.isConfirmed) {
      handleSubmitDelete();
    }
  });

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
      footer={footerComponents}
    >
      <OutcomeForm
        values={values as any}
        setValues={setValues}
      />
    </Modal>
  );
};