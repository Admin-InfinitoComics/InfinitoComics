import dotenv from "dotenv";
dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY,
    JWT_EXPIRY_DATE: process.env.JWT_EXPIRY_DATE,
    FRONTEND_URL: process.env.FRONTEND_URL,
}