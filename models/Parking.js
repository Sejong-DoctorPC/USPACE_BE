import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({
  zone: {
    row: { type: Number },
    col: { type: Number },
  }, // 주차장 구역
  type: { type: Number, required: true }, // 주차장 모드
  state: { type: Number, required: true }, // 주차 가능 여부(일반 and 모드)
  parker: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // 누가 주차? -> User에서 가져오기
});

const Parking = mongoose.model("Parking", parkingSchema);
export default Parking;
