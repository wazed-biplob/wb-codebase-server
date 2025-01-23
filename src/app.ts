import express from "express";
import cors from "cors";
const app = express();
const port = 5000;

app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "https://wb-codebase.vercel.app",
];
app.use(
  cors({
    origin: (origin: any, callback: any) => {
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
