import { IBilling } from "../../@types";

export const emptyBilling = (): IBilling => ({
  id: 0,
  name: '',
  cycle_end_date: null,
  payment_due_date: null,
  billing_type: '',
  credit_card_number: ''
});
