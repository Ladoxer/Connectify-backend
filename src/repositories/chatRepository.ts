import { Chat, IChat } from '../models/Chat';

class ChatRepository {
  async findChat(senderId: string, recipientId: string): Promise<IChat | null> {
    return Chat.findOne({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).populate('senderId').populate('recipientId').populate('message.id');
  }

  async createChat(senderId: string, recipientId: string): Promise<IChat> {
    const newChat = new Chat({ senderId, recipientId });
    return newChat.save();
  }

  async updateChatMessage(chatId: string, message: any): Promise<IChat | null> {
    return Chat.findByIdAndUpdate(
      chatId,
      { $push: { message } },
      { new: true, useFindAndModify: false }
    ).populate('message.id');
  }
}

export const chatRepository = new ChatRepository();