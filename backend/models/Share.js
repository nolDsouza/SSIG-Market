import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const API_KEY = process.env.__PUBLIC1__;

let Share = new Schema({
  asx_id: {
    type: String,
    required: true,
    index: { unique: true }
  },
  value: {
    type: Number,
    required: true
  }
});


export default mongoose.model('Share', Share);
