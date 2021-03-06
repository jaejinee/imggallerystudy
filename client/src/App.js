import React from "react";
import UploadForm from "./components/UploadForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageList from "./components/ImageList";

const App = () => {
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <ToastContainer />
      <h2>Image Gallery</h2>
      <UploadForm />
      <ImageList />
    </div>
  );
};

export default App;
