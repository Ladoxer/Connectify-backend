import express from "express";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';

import env from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import { checkJwt } from "./middlewares/checkJwt";
import { chatService } from "./services/chatService";
import { userController } from "./controllers/userContoller";
import { chatController } from "./controllers/chatController";
env.config();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const app = express();
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL as string}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

io.use(checkJwt);
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', async (data) => {
    console.log(data);
    const { _id, message, userid } = data;
    const newMessage = { id: userid, message };
    const updatedChat = await chatService.updateChatMessage(_id, newMessage);
    console.log(updatedChat);
    io.emit('message', updatedChat);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

app.get('/user', userController.getUsers);
app.get('/user_chat', chatController.getUserChat);
app.post('/login', userController.login);


app.use(errorHandler);

export default app;