import mongoose, { Document, Schema, model } from "mongoose";
import { IUser } from "./User";

export interface IMessage {
  id: IUser['_id'];
  message: string;
}

export interface IChat extends Document {
  senderId: IUser['_id'];
  recipientId: IUser['_id'];
  message: IMessage[];
}

const ChatSchema: Schema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'User' },
      message: { type: String, required: true },
    },
  ],
});

export const Chat = mongoose.model<IChat>('Chat', ChatSchema);