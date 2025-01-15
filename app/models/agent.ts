import mongoose from 'mongoose';

const AgentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  password: { type: String, required: true },
  contact_number: { type: String, required: true },
  email: { type: String, required: false, unique: true }, 
}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);


