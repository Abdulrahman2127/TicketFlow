import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from 'openai'
import employeeRoutes from "./routes/employeeRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import connectDB from "./config/db.js";
dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001;
app.use(express.json())
app.use(cors())
connectDB();

app.get("/", (req,res) => {
  res.send("Backend🚀")
}
)
console.log(process.env.OPENROUTER_API_KEY);
app.use("/api/authentication" , employeeRoutes );
app.use("/api/admin", adminRoutes);

app.listen(PORT , () => {

  console.log(`Server running on http://localhost:${PORT}`)
}
)