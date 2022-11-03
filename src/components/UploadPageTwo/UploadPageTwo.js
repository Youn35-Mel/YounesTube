import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storage } from "../../firebase-config";
import { fetchUser } from "../../utils/fetchUser";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../firebase-config";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/Images/profile.jpg";
import "./UploadPageTwo.scss";

const UploadPageTwo = ({ user }) => {
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

  //send information to the server
  const navigate = useNavigate();
  const firebaseDb = getFirestore(app); //access to the firestore database
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userInfo] = fetchUser();

  const uploadDetails = async (title, description) => {
    const data = {
      id: `${Date.now()}`,
      title: title,
      description: description,
      videoUrl: videoAsset,
      userId: userInfo.uid,
    };
    await setDoc(doc(firebaseDb, "videos", `${Date.now()}`), data);
    navigate("/", { replace: true });
  };

  // const [formFields, setFormFields] = useState(null);
  // const inputChangeHandler = (e) => {
  //   console.log(e.target.value);
  //   const value = e.target.value;
  //   setFormFields({
  //     ...formFields,
  //     [e.target.name]: value,
  //   });
  // };

  return (
    <section className="upload">
      <div className="container">
        <h1 className="upload__title">Upload Page</h1>
        <form className="upload__form" onSubmit={formHandler}>
          <div className="upload__form-row">
            <div className="upload__image">
              <img src={user.photoURL} className="upload__img" alt="Avatar" />
            </div>

            <div className="upload__details">
              <label className="upload__heading">UPLOAD YOUR VIDEO</label>
              <input className="upload__video-upload" type="file" />
              <label className="upload__heading">TITLE YOUR VIDEO</label>
              <input
                onChange={(e) => setTitle(e.target.value)}
                className="upload__video-title"
                name="title"
                id="title"
                type="text"
                // value={title}
              />
              <label className="upload__heading">ADD A VIDEO DESCRIPTION</label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                // value={description}
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
      <div className="upload__delete-upload-container">
        <button className="upload__delete" onClick={deleteImage}>
          Delete
        </button>
        <button
          onClick={() => uploadDetails(title, description)}
          className="upload__upload-server">
          UPLOAD TO SERVER
        </button>
      </div>
      <video
        src={videoAsset}
        style={{ width: "100%", height: "300px" }}></video>
    </section>
  );
};

export default UploadPageTwo;
