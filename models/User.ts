
import mongoose, { Document, Model } from "mongoose";


export interface IUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Please provide a password hash."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = (mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema)) as Model<IUser>;

export default User;
