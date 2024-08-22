import mongoose from "mongoose";

const dependentSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        dob: { type: Date, required: true },
        social_security_number: { type: String, required: true },
        has_mec: { type: Boolean, required: true },
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
        has_mec: { type: Boolean, required: false },
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
    county: { type: String, required: true },
    zip: { type: Number, required: true },
    ssn: {type: String, required: false },
    gross_income: { type: Number, required: true },
    uses_tobacco: { type: Boolean, required: true },
    has_mec: { type: Boolean, required: true }
});

const planSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  issuer: { type: String, required: true }
});

const contactSchema = new mongoose.Schema(
    {
        details: { type: detailsSchema, required: true },
        spouse_details: { type: spouseSchema, required: false },
        dependents: { type: [dependentSchema], required: false },
        plan: { type: planSchema, required: false },
        consent: { type: String, required: false },
        type: { type: String, required: true },
        source: { type: String, required: true, default: "https://www.benefitsritenow.com" },
        environment: { type: String, default: process.env.NODE_ENV },
    },
    { timestamps: true }
);

export default mongoose.model('Leads', contactSchema);