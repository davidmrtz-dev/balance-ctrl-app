import { useState } from "react";
import { IIncome, TransactionType } from "../../@types";
import { updateIncome } from "../../api/core/Income";
import { newIncome } from "../../generators/emptyObjects";
import Alert from "../alert";

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
				const error = err.errors && err.errors.length && err.errors[0];
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

  return <>Income Update</>;
};