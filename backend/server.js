import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import employeeRoutes from "./routes/employeeRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import joinRequestRoutes from "./routes/joinRequestRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5001;
app.use(express.json());

connectDB();
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend🚀");
});

console.log(process.env.OPENROUTER_API_KEY);

app.use("/api/authentication", employeeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/join-request", joinRequestRoutes);
app.use("/api/submit", ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});