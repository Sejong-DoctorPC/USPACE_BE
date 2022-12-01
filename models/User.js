import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Parking",
  },
  postAt: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
