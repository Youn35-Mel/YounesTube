import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../utils/fetchData";
import "./VideoPin.scss";
import { getFirestore, arrayUnion, doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import LikeArticle from "../LikeArticle/LikeArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, app, auth } from "../../firebase-config";

const avatarProfile =
  "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png";

const VideoPin = ({ data, user, setLikeClicked, row }) => {
  // console.log(data);
  console.log(user);

  const [person] = useAuthState(auth);
  console.log(person);

  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  // const savedMovie = doc(db, "Saved", `${user?.email}`);
  const savedMovie = doc(db, "Saved", "FABN231mL5VcgOxXSWJE");

  const saveShow = async () => {
    console.log("liked to save");
    if (user?.email) {
      setLike(!like);
      setSaved(true);

      console.log(savedMovie);

      await updateDoc(savedMovie, {
        savedShows: arrayUnion({
          userId: user.uid,
          id: data.id,
          title: data.title,
          videoURL: data.videoUrl,
        }),
      });
    }
  };

  useEffect(() => {
    if (data) setUserId(data.userId);
    if (userId)
      getUserInfo(db, userId).then((data) => {
        setUserInfo(data);
      });
  }, [userId]);

  let arrayPin = ["small", "medium", "large"];
  let pinSize = arrayPin[Math.floor(Math.random() * arrayPin.length)];

  return (
    <div className={`${row ? `pin ${pinSize}` : "no-pin"}`}>
      <Link to={`/videoDetails/${data.id}`}>
        <video
          className={`${row ? "mainPic" : "no-mainPic"}`}
          src={data.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}></video>
      </Link>
      <div className={`${row ? "content" : "NoContent"}`}>
        <div className={`${row ? "content__left" : "NoContent__left"}`}>
          <Link to={`/userProfile/${userId}`}>
            <img
              className={`${
                row ? "channels__profile-img" : "NoContent__profile-img"
              }`}
              src={userInfo?.photoURL ? userInfo?.photoURL : avatarProfile}
              alt=""
            />
          </Link>
          <h3 className={`${row ? "content__title" : "NoContent__title"}`}>
            {data.title}
          </h3>
        </div>
        <div className={`${row ? "content__right" : "NoContent__right"}`}>
          <p className={`${row ? "content__time" : "NoContent__time"}`}>
            {" "}
            {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
          </p>

          <p
            className={`${row ? "content__like" : "NoContent__like"}`}
            onClick={saveShow}>
            {user && (
              <LikeArticle
                id={data.id}
                likes={data.likes}
                setLikeClicked={setLikeClicked}
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPin;
