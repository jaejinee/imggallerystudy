import React, { useState, useContext } from "react";
import axios from "axios";
// toastfy 발동
import { toast } from "react-toastify";
import "./UploadForm.css";
import ProgressBar from "./ProgressBar";
import { ImageContext } from "../context/ImageContext";

const UploadForm = () => {
  const [images, setImages] = useContext(ImageContext);
  const defaultFileName = "upload your images";
  // 이미지 파일 훅
  const [file, setFile] = useState(null);
  // 이미지 url 훅
  const [imgSrc, setImgSrc] = useState(null);
  // 이미지 파일 이름 훅
  const [fileName, setfileName] = useState(defaultFileName);
  // 업로드 진행상황 훅
  const [percent, setPercent] = useState(0);

  const imageSelectHandler = (e) => {
    // 대상 파일의 첫번째 파일 값을
    const imageFile = e.target.files[0];
    // file에 넣어주고
    setFile(imageFile);
    // 파일 이름을 fileName에 넣어줌
    setfileName(imageFile.name);
    // 파일 읽기
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => setImgSrc(e.target.result);
  };

  // try 부분의 awiat가 처리 완료 될때까지 기다리기 위해 async 사용
  const onSubmit = async (e) => {
    // 제출 버튼을 눌렀을 때 새로고침(default action) 방지
    e.preventDefault();
    const formData = new FormData();
    // formData 안에 'image'를 key, file을 value로 받음
    formData.append("image", file);
    // try에 오류가 발생하면 catch로 보냄
    try {
      // images라는 리소스에 이미지 업로드하기
      const res = await axios.post("/images", formData, {
        // 이미지 업로드?
        headers: { "Content-Type": "multipart/form-data" },
        // 업로드 progressbar
        onUploadProgress: (e) => {
          setPercent(Math.round((100 * e.loaded) / e.total));
        },
      });
      // 이미지 submit하자마자 이미지 목록 업데이트
      // ...images는 기존 이미지들을 다 뿌려주고, res.data는 새로운 이미지 추가
      setImages([...images, res.data]);
      toast.success("completed");
      // 업로드 완료 후 3초 뒤 리셋
      setTimeout(() => {
        setPercent(0);
        setfileName(defaultFileName);
        setImgSrc(null);
      }, 3000);
    } catch (err) {
      setPercent(0);
      setfileName(defaultFileName);
      setImgSrc(null);
      toast.error(err.message);
    }
  };

  return (
    // 제출 버튼을 누르면 onSubmit 실행
    <form onSubmit={onSubmit}>
      <img
        className="img-preview"
        // className={`img-preview ${imgSrc && "image-preview-show"}`}
        src={imgSrc}
      />
      <ProgressBar percent={percent} />
      <div className="img-dropper">
        {fileName}
        <input
          id="iamge"
          type="file"
          // 이미지 파일만 업로드 가능하게 제한
          accept="image/*"
          // 인풋에 변화가 생기면 imageSelectHandler 실행
          onChange={imageSelectHandler}
        />
      </div>
      <button className="submit-button" type="submit">
        submit
      </button>
    </form>
  );
};

export default UploadForm;
