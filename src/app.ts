import express from "express";
import cors from "cors";

import env from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
env.config();

const app = express();
app.use(cors({credentials: true, origin: process.env.FRONTEND_URL as string}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(errorHandler);

export default app;