import { verifyToken } from '../Utils/token';
import { chatRepository } from '../repositories/chatRepository';
import { userRepository } from '../repositories/userRepository';

class ChatService {
  async getOrCreateChat(token: string, recipientId: string) {
    const decoded: any = verifyToken(token);
    const user = await userRepository.findByEmail(decoded.email);
    if (!user) throw new Error('User not found');

    let chat = await chatRepository.findChat(user._id, recipientId);
    if (!chat) {
      chat = await chatRepository.createChat(user._id, recipientId);
    }
    return chat;
  }

  async updateChatMessage(chatId: string, message: any) {
    return chatRepository.updateChatMessage(chatId, message);
  }
}

export const chatService = new ChatService();