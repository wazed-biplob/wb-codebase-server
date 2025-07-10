import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { User } from "./interface/user.model";

dotenv.config({ path: path.join(process.cwd(), ".env") });
const app = express();

app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://wb-codebase.vercel.app",
];
app.use(
  cors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void
    ) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "DELETE", "UPDATE"],
  })
);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/userInfo", async (req, res) => {
  if (req.body.userId !== "" || undefined || null) {
    const response = await User.create(req.body);
    console.log(req.body);
    res.send({ response });
  }
});

app.delete("/users/delete-traffic/:id", async (req, res) => {
  const id = req?.params?.id;
  if (id) {
    console.log(id);
    const response = await User.deleteOne({ _id: id });
    res.send({ response });
  }
});

app.get("/users/userInfo", async (req, res) => {
  const response = await User.find();
  console.log(req.body);
  res.send({ response });
});

async function main() {
  try {
    mongoose
      .connect(process.env.DB_URL as string)
      .then(() => console.log("MongoDB connected."));
    app.listen(process.env.PORT, () => {
      console.log(`app is running at 2222!`);
    });
  } catch (e) {
    console.log(`Error : `, e);
  }
}

main();

export default app;
