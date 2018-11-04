import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const init_name = 'default';
const init_value = 100000000;

let TransactionAccount = new Schema({
  name: {
    type: String,
    default: init_name,
  },
  balance: {
    type: Number,
    default: init_value
  },
  shares: {
    type: Schema.Types.Mixed,
    default: {}
  },
  dateCreated: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('TransactionAccount', TransactionAccount);
