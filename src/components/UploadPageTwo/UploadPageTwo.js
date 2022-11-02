import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storage } from "../../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";

import profile from "../../assets/Images/profile.jpg";
import "./UploadPageTwo.scss";

const UploadPageTwo = () => {
  const [videoAsset, setVideoAsset] = useState(null);
  const [progress, setProgress] = useState(0);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `videos/${file.name}`);
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
          setVideoAsset(downloadURL);
        });
      }
    );
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, videoAsset);
    deleteObject(deleteRef)
      .then(() => {
        setVideoAsset(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect(() => {}, [videoAsset]);

  return (
    <section className="upload">
      <div className="container">
        <h1 className="upload__title">Upload Page</h1>
        <form className="upload__form" onSubmit={formHandler}>
          <div className="upload__form-row">
            <div className="upload__image">
              <label className="upload__header">THUMBNAIL VIDEO</label>
              <img src={profile} className="upload__img" alt="Avatar" />
            </div>

            <div className="upload__details">
              <label className="upload__heading">TITLE YOUR VIDEO</label>
              <input className="upload__video-title" type="file" />
              <label className="upload__heading">ADD A VIDEO DESCRIPTION</label>
              <textarea
                className="upload__video-description"
                type="text"
                name="description"
                id="description"
                placeholder="Add a new comment"></textarea>
            </div>
          </div>
          <div className="upload__submit-button">
            <button className="upload__publish-btn">PUBLISH</button>

            {/* <Link to="/">
              <button className="upload__cancel-btn">CANCEL</button>
            </Link> */}
          </div>
        </form>
        <hr />
        <h2>Uploading done {progress}%</h2>
      </div>
      <div>
        <button onClick={deleteImage}>Delete</button>
        <video
          src={videoAsset}
          style={{ width: "100%", height: "300px" }}></video>
      </div>
    </section>
  );
};

export default UploadPageTwo;
