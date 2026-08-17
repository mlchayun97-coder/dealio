import "dotenv/config";
import express from "express";
import cors from "cors";
import { aiRouter } from "./routes/ai.js";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8787;

app.use(cors());
app.use(express.json());

app.use("/api", aiRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`Dealio AI proxy listening on http://localhost:${port}`);
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn("⚠ ANTHROPIC_API_KEY is not set — /api/* requests will fail. Copy server/.env.example to server/.env and add your key.");
  }
});
