import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve(__dirname, "../../.env")});

export const config = {
  emailUser: process.env.EMAIL_USER || "phaiyladsamee@gmail.com",
  emailPass: process.env.EMAIL_PASS || "0@mGi?@Z",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  databaseUrl: process.env.DATABASE_URL,
  host: process.env.HOST,
};