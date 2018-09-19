import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const API_KEY = process.env.__PUBLIC1__;

let Share = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  }
});


export default mongoose.model('Share', Share);
