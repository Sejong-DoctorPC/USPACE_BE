import mongoose from "mongoose";

const reserveSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parking",
  },
  postAt: { type: Date, default: Date.now },
});

const Reserve = mongoose.model("Reserve", reserveSchema);
export default Reserve;
