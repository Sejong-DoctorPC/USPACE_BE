import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
  },
  postAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
