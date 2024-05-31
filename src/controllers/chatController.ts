import { Request, Response } from 'express';
import { chatService } from '../services/chatService';

class ChatController {
  async getUserChat(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw new Error('No token provided');
      const recipientId = req.query.id as string;
      const chat = await chatService.getOrCreateChat(token, recipientId);
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export const chatController = new ChatController();