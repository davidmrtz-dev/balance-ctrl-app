import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import { IIncome, TransactionType } from "../../@types";
import { createIncome } from "../../api/core/Income";
import { newIncome } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { IncomeForm } from "./IncomeForm";

export const IncomeCreate = ({
  open,
  type,
  close,
  handleCreate
}: {
  open: boolean;
  type: TransactionType;
  close: () => void;
  handleCreate: (income: IIncome) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IIncome>(newIncome(type));

  const handleSubmit = async () => {
    if (Object.values(values).some(val => val === '')) {
      Alert({
        icon: 'error',
        text: 'All fields are required'
      });
      return;
    }

    setLoading(false);

    try {
      const income = await createIncome({
        ...values
      } as IIncome);
      setTimeout(async () => {
        await handleCreate(income);
        setValues(newIncome(type));
        setLoading(false);
        close();
      }, 1000);
    } catch (err: any) {
      setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors[0];
        Alert({
          icon: 'error',
          text: (error || 'There was an error, please try again later.'),
        });
        setValues(newIncome(type));
        setLoading(false);
        close();
      }, 1000);
    }
  };

  const handleCancel = () => {
    setValues(newIncome(type));
    close();
  };

  return(<Modal
    destroyOnClose
    maskClosable={false}
    closable={false}
    open={open}
    title={<Typography.Text
      style={{...theme.texts.brandFont, fontWeight: 'normal'}}
      > New {type} income
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
    <IncomeForm
      values={values}
      setValues={setValues}
    />
  </Modal>);
};