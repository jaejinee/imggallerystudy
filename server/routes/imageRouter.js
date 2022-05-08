const { Router } = require("express");
const imageRouter = Router();
const Image = require("../models/Image");
const { upload } = require("../middleware/imageUpload");

// 이미지 올린걸 확인할 수 있게 보여줌
// images라는 리소스에 포스트를 생성하기
// "image"값은 업로드 form과 일치해야함
imageRouter.post("/", upload.single("image"), async (req, res) => {
  // DB에 이미지 저장
  const image = await new Image({
    key: req.file.filename,
    originalFileName: req.file.originalname,
  }).save();
  res.json(image);
});

// DB에서 이미지 불러오기
imageRouter.get("/", async (req, res) => {
  // 배열로 모든 이미지 다 불러오기
  const images = await Image.find();
  res.json(images);
});

module.exports = { imageRouter };
