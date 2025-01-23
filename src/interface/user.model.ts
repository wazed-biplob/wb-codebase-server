import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    userId: { type: String },
    dateTime: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
