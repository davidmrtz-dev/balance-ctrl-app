import { Button, Modal } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { IOutcome, TransactionType } from "../../../@types";
import { deleteOutcome, updateOutcome } from "../../../api/core/Outcome";
import { newOutcome } from "../../../generators/emptyObjects";
import { theme } from "../../../Theme";
import Alert from "../../alert";
import { OutcomeForm } from "./OutcomeForm";
import { FontText } from "../../../atoms/text";
import { capitalizeFirst } from "../../../utils";
import styled from "styled-components";

const OutcomeUpdate = ({
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
  handleDelete?: (id: number) => void;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [values, setValues] = useState<IOutcome>(newOutcome(type));
  const [enableEdit, setEnableEdit] = useState(false);

  const handleSubmitUpdate = useCallback(async () => {
    if (Object.values(values).some(val => val === '')) {
      Alert({
        icon: 'error',
        text: 'All fields are required'
      });
      return;
    }

    setLoading(true);

    try {
      const updatedOutcome = await updateOutcome({
        ...values,
        transaction_date: dayjs(values.transaction_date).format('YYYY-MM-DD'),
        categorizations_attributes: outcome.categories[0].id !== values.categories[0].id ? [{
          category_id: values.categories[0].id
        }] : undefined,
        billing_transactions_attributes: outcome.billings[0].id !== values.billings[0].id ? [{
          billing_id: values.billings[0].id
        }] : undefined
      } as IOutcome);
      setTimeout(async () => {
        await handleUpdate(updatedOutcome);
        setValues(updatedOutcome);
        setLoading(false);
        setEnableEdit(false);
        Alert({
          icon: 'success',
          text: 'Outcome updated successfully'
        })
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.')
        });
        setLoading(false);
      }, 1000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        const error = err.errors?.length && err.errors;

        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.')
        });
        setValues(newOutcome(type));
        setDeleting(false);
        closeModal();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newOutcome(type));
    setEnableEdit(false);
    closeModal();
  };

  useEffect(() => {
    setValues({ ...outcome, transaction_date: dayjs(outcome.transaction_date) });
  }, [outcome]);

  const footerComponents = [
    <Button
      key="cancel"
      onClick={enableEdit ? () => setEnableEdit(false) : handleCancel}
      disabled={loading || deleting}
    >
      {FontText(`${enableEdit ? 'Cancel' : 'Close'}`)}
    </Button>
  ];

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

  if (enableEdit) {
    if (handleDelete) {
      footerComponents.unshift(<Button style={{
        backgroundColor: theme.colors.warning
      }}
        key="delete"
        onClick={() => setConfirm(true)}
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
        onClick={handleSubmitUpdate}
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
      title={<TitleContainer>
        {FontText(`${capitalizeFirst(outcome.transaction_type || '')} outcome details`, { fontWeight: 'normal' })}
        <Button
          key="edit"
          onClick={() => setEnableEdit(true)}
          style={{ backgroundColor: enableEdit ? theme.colors.grays.normal : theme.colors.blues.normal }}
          disabled={enableEdit}
        >
          {FontText('Edit', { color: theme.colors.whites.normal })}
        </Button>
      </TitleContainer>}
      style={{
        maxWidth: 360,
        position: 'relative'
      }}
      footer={footerComponents}
    >
      <OutcomeForm
        editable={enableEdit}
        values={values}
        setValues={setValues}
      />
    </Modal>
  );
};

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default OutcomeUpdate;
