import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../utils/fetchData";
import "./VideoPin.scss";
import { app, auth } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LikeArticle from "../LikeArticle/LikeArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "../../firebase-config";

const avatarProfile =
  "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png";

const VideoPin = ({ data, user }) => {
  console.log(data);
  // const [user] = useAuthState(auth);

  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

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
    <div className={`pin ${pinSize}`}>
      <Link to={`/videoDetails/${data.id}`}>
        <video
          className="mainPic"
          src={data.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}></video>
      </Link>
      <div className="content">
        <div className="content__left">
          <Link to={`/userProfile/${userId}`}>
            <img
              className="channels__profile-img"
              src={userInfo?.photoURL ? userInfo?.photoURL : avatarProfile}
              alt=""
            />
          </Link>
          <h3 className="content__title">{data.title}</h3>
        </div>
        <div className="content__right">
          <p> {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}</p>
          <p
          // onClick={saveShow}
          >
            {user && <LikeArticle id={data.id} likes={data.likes} />}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPin;
