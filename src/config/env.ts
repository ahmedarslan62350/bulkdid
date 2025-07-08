import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});

export const ENV = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  isTerminalSocketRunning: process.env.isTerminalSocketRunning,
  MONGODB_URI: process.env.MONGODB_URI,
};