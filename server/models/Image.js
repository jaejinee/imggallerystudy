const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    originalFileName: { type: String, required: true },
  },
  {
    // create, update 시간 자동 생성
    timestamps: true,
  }
);

module.exports = mongoose.model("image", ImageSchema);
