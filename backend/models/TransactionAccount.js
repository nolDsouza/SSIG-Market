import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const init_value = 1000000;

let TransactionAccount = new Schema({
  name: {
    type: String,
    default: 'default'
  },
  balance: {
    type: Number,
    default: init_value
  },
  shares: {
    type: Array
  },
  dateCreated: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('TransactionAccount', TransactionAccount);
