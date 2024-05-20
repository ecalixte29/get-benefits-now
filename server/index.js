import dotenv from "dotenv";
import express from "express";
import parser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import fs from "fs";
import ContactsRouter from "./routes/contacts.js";
import AuthRouter from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5001;
dotenv.config();

app.use(parser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL.split(","),
  })
);

app.use(express.json());
// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

app.use("/contacts", ContactsRouter);
app.use("/auth", AuthRouter);

app.get("/pdfs/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = `${__dirname}/pdfs/${fileName}`;

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If file does not exist, send 404 Not Found status
      res.status(404).send("File not found");
      return;
    }

    // If file exists, send the file
    res.sendFile(filePath);
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
