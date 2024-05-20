import mongoose from "mongoose";

const Admin = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, requred: true },
}, { timestamps: true })

export default mongoose.model('Admin', Admin )