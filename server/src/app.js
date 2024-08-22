import express from "express";
import parser from "body-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import contactRoutes from "./routes/contact.routes.js";
import plansRoutes from "./routes/plan.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(parser.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL.split(","),
  })
);

app.use("/contacts", contactRoutes);
app.use("/plans", plansRoutes);

app.get("/pdfs/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, `../pdfs/${fileName}`);
  console.log("filePath", filePath);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.status(404).send("File not found");
    res.sendFile(filePath);
  });
});

app.use(errorHandler);

export default app;
