import mongoose from "mongoose";

const shortUserSchema = new mongoose.Schema({
  user: { type: String, required: true },
  pwd: { type: String, required: true },
});

const ShortUser = mongoose.model("User", shortUserSchema);
export default ShortUser;
