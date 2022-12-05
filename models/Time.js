import bcrypt from "bcrypt";
import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
  creaAt: { type: Date, required: true, unique: true, default: Date.now },
});

const Time = mongoose.model("Time", timeSchema);
export default Time;
