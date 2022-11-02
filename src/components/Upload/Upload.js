import React, { useState } from "react";
import "./Upload.scss";
import {
  IoCheckmark,
  IoChevronDown,
  IoCloudUpload,
  IoLocation,
  IoTrash,
  IoWarning,
} from "react-icons/io5";
import Spinner from "../Spinner/Spinner";

//storage
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "../../firebase-config";
// import AlertMsg from "./AlertMsg";
// import { Editor } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";
// import { fetchUser } from "../utils/fetchUser";
import { doc, getFirestore, setDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("choose as category");
  const [location, setLocation] = useState("");
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const storage = getStorage(app);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <section className="upload">
      <div className="upload__container">
        <div className="upload__container-two">
          <form onSubmit={formHandler} action="" className="upload__form">
            <input
              type="text"
              className="upload__form-title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="upload__form-selector-location">
              <select
                // onChange={(e) => inputChangeHandler(e)}
                type="text"
                name="category"
                className="upload__form-selector">
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Health">Health</option>
              </select>
              <input
                type="text"
                placeholder="location"
                className="upload__form-location"
              />
            </div>
            <div className="upload__selector">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <IoCloudUpload />
                  <p className="upload__text">Click Upload</p>
                </>
              )}
              {!loading && (
                <input
                  className="upload__hide"
                  type="file"
                  name="upload-video"
                  onSubmit={formHandler}
                  accept="video/mp4"
                />
              )}
            </div>
            <button className="upload__publish-btn">PUBLISH</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Upload;
