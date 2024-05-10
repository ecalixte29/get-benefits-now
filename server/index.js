import dotenv from "dotenv";
import express from "express";
import { v4 as uuid } from "uuid";
import ContactSchema from "./schemas/Contacts.js";
import parser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(path.dirname(__dirname), "/client/build")));
const router = express.Router();

const PORT = process.env.PORT || 5001;
dotenv.config();

app.use(parser.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL.split(','),
    })
);

app.use(express.json());
// Connect to MongoDB
mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

const dependentSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        dob: { type: Date, required: true },
        relationship: { type: String, required: true },
        social_security_number: { type: String, required: true },
        gender: { type: String, required: true },
        uses_tobacco: { type: Boolean, required: true }
    },
    { _id: false }
);

const spouseSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: false },
        last_name: { type: String, required: false },
        dob: { type: Date, required: false },
        social_security_number: { type: String, required: false },
        gender: { type: String, required: false },
        uses_tobacco: { type: Boolean, required: false }
    },
    { _id: false }
);

const detailsSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    county: { type: String, required: false },
    gross_income: { type: Number, required: true },
    estimated_income: { type: String, required: true },
    us_national: { type: Boolean, required: true },
    uses_tobacco: { type: Boolean, required: true },
    current_insurance: { type: Boolean, required: true }
});

const contactSchema = new mongoose.Schema(
    {
        details: { type: detailsSchema, required: true },
        spouse_details: { type: spouseSchema, required: false },
        dependents: { type: [dependentSchema], required: false },
        type: { type: String, required: true },
        source: { type: String, required: true, default: "https://www.benefitsritenow.com" },
        test: { type: String, default: process.env.NODE_ENV },
    },
    { timestamps: true }
);

const Contact = mongoose.model('Todo', contactSchema);

router
    .post("/", async (req, res) => {
        try {
            const contact = new Contact(req.body);

            const validationError = contact.validateSync();
            if (validationError) {
                return res.status(400).json({ error: validationError.message });
            }

            const savedContact = await contact.save();

            res.status(201).json(savedContact);
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Server error' });
        }
    })
    .get("/", async (req, res) => {
        res.json({ status: 200 });
    })
    .get("/:id", async (req, res) => {
        res.json({ status: 200 });
    })
    .put("/:id", async (req, res) => {
        res.json({ status: 200 });
    })

app.use("/contacts", router);

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});