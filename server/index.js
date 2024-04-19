import dotenv from "dotenv";
import express from "express";
import { v4 as uuid } from "uuid";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import ApplicationSchema from "./shemas/Application.js";
import parser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(path.dirname(__dirname), "/client/build")));

const PORT = 5001;

dotenv.config();

app.use(parser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});
// Create a new client
const firestore = getFirestore();

const router = express.Router();
router
  .post("/", async (req, res) => {
    const id = uuid();
    const data = req.body;

    const { value, error } = ApplicationSchema.validate(data);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });

    let countyfips = await fetch(
      `https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/${value.details.zip}?apikey=${process.env.API_KEY}`
    );
    countyfips = await countyfips.json();

    if (countyfips.error)
      return res.status(400).json({
        message: countyfips.error,
      });
    if (countyfips.counties.length === 0)
      return res.status(400).json({
        message: "Failed to fetch countyfip",
      });
    value.details.countyfips = countyfips.counties[0].fips;

    const document = firestore.collection("leads").doc(id);

    await document.set(value);

    res.json({ uuid: id });
  })
  .get("/:uuid", async (req, res) => {
    const document = firestore.collection("leads").doc(req.params.uuid);
    res.json({ data: (await document.get()).data() });
  })
  .put("/:uuid", async (req, res) => {
    const { plan_id, signature } = req.body;
    const document = firestore.collection("leads").doc(req.params.uuid);

    if (!(await document.get()).exists) res.sendStatus(404);

    if (plan_id) {
      await document.update({
        plan_id,
      });
    } else if (signature) {
      await document.update({
        signature,
      });
    }

    return res.sendStatus(200);
  });

app.use("/leads", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
