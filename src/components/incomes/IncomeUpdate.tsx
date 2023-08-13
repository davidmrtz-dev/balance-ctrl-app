import { Button, Modal, Typography } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IIncome, TransactionType } from "../../@types";
import { deleteIncome, updateIncome } from "../../api/core/Income";
import { newIncome } from "../../generators/emptyObjects";
import { theme } from "../../Theme";
import Alert from "../alert";
import { IncomeForm } from "./IncomeForm";

export const IncomeUpdate = ({
	income,
	open,
	type,
	close,
	handleUpdate,
	handleDelete
}: {
	income: IIncome;
	open: boolean;
	type: TransactionType;
	close: () => void;
	handleUpdate: (income: IIncome) => Promise<void>;
	handleDelete?: (id: number) => void;
}): JSX.Element => {
	const [loading, setLoading] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [values, setValues] = useState<IIncome>(newIncome(type));

	const handleSubmitUpdate = async () => {
		if (Object.values(values).some(val => val === '')) {
			Alert({
				icon: 'error',
				text: 'All fields are required'
			});
			return;
		}

		setLoading(true);

		try {
			const income = await updateIncome({
				...values
			} as IIncome);
			setTimeout(async () => {
				await handleUpdate(income);
				setValues(newIncome(type));
				setLoading(false);
				close();
			}, 1000);
		} catch (err: any) {
			setTimeout(() => {
        const error = err.errors && err.errors.length && err.errors.join(', ');

				Alert({
					icon: 'error',
					text: (error || 'There was an error, please try again later.')
				});
				setValues(newIncome(type));
				setLoading(false);
				close();
			}, 1000);
		}
	};

	const handleSubmitDelete = async () => {
		setDeleting(true);

		try {
			await deleteIncome(income.id);
			setTimeout(async () => {
				handleDelete && handleDelete(income.id);
				setValues(newIncome(type));
				setDeleting(false);
				close();
			}, 1000);
		} catch (err: any) {
			setTimeout(() => {
        const error = err.errors?.length && err.errors;

				Alert({
					icon: 'error',
					text: (error || 'There was an error, please try again later.')
				});
				setValues(newIncome(type));
				setDeleting(false);
				close();
			}, 1000);
		}
	};

	const handleCancel = () => {
		setValues(newIncome(type));
		close();
	};

	useEffect(() => {
		setValues({ ...income, transaction_date: dayjs(income.transaction_date) });
	}, [income]);

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

  return (<Modal
		destroyOnClose
		maskClosable={false}
		closable={false}
		open={open}
		title={<Typography.Text
			style={{...theme.texts.brandFont, fontWeight: 'normal'}}
			> Update {income.transaction_type} income
			</Typography.Text>}
		style={{
			maxWidth: 360,
			position: 'relative'
		}}
		footer={footerComponents}
	>
		<IncomeForm
			values={values}
			setValues={setValues}
		/>
	</Modal>);
};
