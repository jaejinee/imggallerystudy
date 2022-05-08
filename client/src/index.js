import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 모든 이미지 관리
import { ImageProvider } from "./context/ImageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ImageProvider>
      <App />
    </ImageProvider>
  </React.StrictMode>
);
