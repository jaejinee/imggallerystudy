import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 모든 이미지 파일 관리
export const ImageContext = createContext();
export const ImageProvider = (prop) => {
  const [images, setImages] = useState([]);

  // useEffect 인자값: 1.함수, 2.언제 그 함수를 실행할지(배열값을 넣으면 바뀔때마다 반복실행 / 빈 배열은 처음 렌더할때만 실행)
  useEffect(() => {
    axios
      .get("/images")
      .then((result) => setImages(result.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <ImageContext.Provider value={[images, setImages]}>
      {prop.children}
    </ImageContext.Provider>
  );
};
