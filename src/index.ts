import app from "./app";
import env from "dotenv";
env.config();

const PORT = process.env.PORT;

// db connect


const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});