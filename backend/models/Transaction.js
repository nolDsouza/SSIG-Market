import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Transaction = new Schema({
  is_buying: {
    type: Boolean,
    default: true
  },
  account_name: {
    type: String,
    required: true
  },
  asx_code: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dateCreated: { 
    type: Date, 
    default: Date.now 
  }
});


export default mongoose.model('Transaction', Transaction);
