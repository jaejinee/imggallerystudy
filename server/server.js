// 보안
require("dotenv").config();
const express = require("express");
// mogodb
const mongoose = require("mongoose");
// imageRouter
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();
const { MONGO_URI, PORT } = process.env;

// DB 연결
mongoose
  .connect(MONGO_URI, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MogoDB connected");
    // DB 연결 후 서버 구동
    // 클라이언트 측에서 주소 경로를 통해 이미지 접속하게 허락
    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    // images 경로에 있는 모든 걸 imageRouter로 전송
    app.use("/images", imageRouter);
    app.use("/users", userRouter);
    // 서버 실행
    app.listen(PORT, () => {
      console.log("Express server listening on PORT " + PORT);
    });
  })
  .catch((err) => console.log(err));
