import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
