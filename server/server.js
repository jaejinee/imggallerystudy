const express = require("express");
// 이미지 저장
const multer = require("multer");
// 이미지 파일 이름 유니크한 아이디로 생성
const { v4: uuid } = require("uuid");
// 이미지 파일 확장자 붙이기
const mime = require("mime-types");

// 이미지 저장
const storage = multer.diskStorage({
  // 저장되는 곳
  destination: (req, file, cb) => cb(null, "./uploads"),
  // 이미지 파일 이름
  filename: (req, file, cb) =>
    //이미지 파일 확장자 붙이기
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`),
});
const upload = multer({
  storage,
  // 이미지 파일 필터 설정 - 확장자 설정
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type"), false);
    }
  },
  limits: {
    // 파일 사이즈 5메가로 제한
    fileSize: 1024 * 1024 * 5,
  },
});

const app = express();
const PORT = 3000;

// 클라이언트 측에서 주소 경로를 통해 이미지 접속하게 허락
app.use("/uploads", express.static("uploads"));

// 이미지 올린걸 확인할 수 있게 보여줌
app.post("/upload", upload.single("imageTest"), (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

// 서버 실행
app.listen(PORT, () => {
  console.log("Express server listening on PORT " + PORT);
});
