import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  email: { 
    type: 'String', 
    required: true 
  },
  password: { 
    type: 'String', 
    required: true 
  },
  _ID: { 
    type: 'String', 
    required: true, 
    default: '5b6082a0bccc0d4aac848bea' 
  },
});

export default mongoose.model('Account', AccountSchema);
