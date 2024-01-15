import { IBilling } from "../../@types";

export const emptyBilling = (): IBilling => ({
  name: '',
  cycle_end_date: null,
  payment_due_date: null,
  billing_type: ''
});
