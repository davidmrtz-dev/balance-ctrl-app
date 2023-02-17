import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IOutcome, TransactionType } from "../../@types";
import { updateOutcome } from "../../api/core/Outcome";
import { emptyCurrentOutcome } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { TransactionForm } from "./TransactionForm";

export const TransactionUpdate = ({
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
  handleUpdate: (outcome: IOutcome) => Promise<void>;
  handleDelete: (outcome: IOutcome) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IOutcome>(emptyCurrentOutcome());
  const [showDelete, setShowDelete] = useState(false);

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
        setValues(emptyCurrentOutcome());
        setLoading(false);
        closeModal();
      }, 1000);
    } catch(err: any) {
      setTimeout(() => {
        const error = err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again.'),
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
    if (!Object.values(outcome).some(val => val === '')) {
      setValues(outcome);
    }
  }, [outcome]);

  useEffect(() => {
    if (showDelete) {
      Alert({
        title: 'Are you sure?',
        text: 'This action cannot be undone',
        icon: 'warning',
        showCancelButton: true
      }).then(async (result) => {
        setShowDelete(false);
        if (result.isConfirmed) {
          try {
            await handleDelete(outcome);
            closeModal();
          } catch (err: any) {
            const error = err.errors.length && err.errors[0];
            Alert({
              icon: 'error',
              text: (error || 'There was an error, please try again.'),
            });
          }
        }
      })
    }
  }, [showDelete]);

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
        maxWidth: 360,
        position: 'relative'
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
      <>
        <TransactionForm
          values={values}
          setValues={setValues}
        />
        {RemoveTransaction(() => setShowDelete(true))}
      </>
    </Modal>
  );
};

const RemoveTransaction = (showModal: () => void): JSX.Element => {
  return (<FontAwesomeIcon
    onClick={showModal}
    style={{
      position: 'absolute',
      top: 25,
      right: 25,
      cursor: 'pointer'
    }}
    color={theme.colors.blacks.normal}
    icon={faTrash}
  />);
};