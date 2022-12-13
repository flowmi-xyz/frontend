export type MultisigTransaction = {
  id: number;
  to: string;
  currency: string;
  value: number;
  executed: boolean;
  numConfirmations: number;
};
