import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    ip: { type: String },
    userAgent: { type: String },
    language: { type: String },
    platform: { type: String },
    cores: { type: Number },
    width: { type: Number },
    height: { type: Number },
    colorDepth: { type: Number },
    currentTime: { type: String },
    timezone: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
