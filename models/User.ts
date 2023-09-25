import { IUser } from '@/interfaces';
import mongoose, { model, Model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: {
        values: ['admin', 'client', 'employee'],
        message: `{VALUE} is not a role`,
        default: 'client',
        required: true,
      },
    },
    userImage: { type: String, default: '' },
    department: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    cellphone: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
