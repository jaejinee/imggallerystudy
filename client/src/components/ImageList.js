import React, { useContext } from "react";
import { ImageContext } from "../context/ImageContext";

const ImageList = () => {
  const [images] = useContext(ImageContext);
  const imgList = images.map((image) => (
    <img
      key={image.key}
      style={{ width: "calc(100% / 3 - 6px)", margin: "0 3px" }}
      src={`http://localhost:3001/uploads/${image.key}`}
    ></img>
  ));
  return (
    <div>
      <h2>Image List</h2>

      {imgList}
    </div>
  );
};

export default ImageList;
