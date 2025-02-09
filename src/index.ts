import express, { Application } from "express";
import { connectDatabase } from "./db";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import contentRouter from "./routes/content.route";
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

connectDatabase();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/content", contentRouter);

app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`)
});