export interface Transaction {
  user_id: string;
  asx_code: string;
  value: number;
  amount: number;
  account_id: string;
}

export interface TransactionPayload {
  _id: string;
  user_id: string;
  asx_code: string;
  value: number;
  amount: number;
  account_id: string;
  dateCreated: Date;
}
