import { useState } from "react";
import { IIncome, TransactionType } from "../../@types";
import { newIncome } from "../../generators/emptyObjects";

export const IncomeCreate = ({
  open,
  type,
  close,
  handleCreate
}: {
  open: boolean;
  type: TransactionType;
  closeModal: () => void;
  handleCreate: (income: IIncome) => Promise<void>;
}): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<IIncome>(newIncome(type));

  return <>IncomeCreate</>;
};