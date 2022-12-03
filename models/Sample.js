import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
  zone: { type: String, required: true }, // 주차장 구역
  type: { type: Number, required: true }, // 주차장 모드
  state: { type: Number, required: true }, // 주차 가능 여부(일반 and 모드)
});

const Sample = mongoose.model("Sample", sampleSchema);
export default Sample;
