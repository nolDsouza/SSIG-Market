import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TransactionAccount = new Schema({
  name: {
    type: String
  },
  owner: {
    type: String
  },
  balance: {
    type: Number
  },
  shares: {
    type: Array
  },
  value: {
    type: Number
  },
  description: {
    type: String
  },
  dateCreated: { 
    type: Date, 
    default: Date.now 
  }
}, { collection: 'transaction_accounts' });

export default mongoose.model('TransactionAccount', TransactionAccount);
