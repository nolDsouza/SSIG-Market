import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Company = new Schema({
  asx_code: {
    type: String,
    required: true,
    index: { unique: true }
  },
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String
  }
});


export default mongoose.model('Company', Company);
