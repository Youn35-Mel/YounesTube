import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../utils/fetchData";
import "./VideoPin.scss";
import { app } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
const avatarProfile =
  "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png";

const VideoPin = ({ data, user }) => {
  // console.log(data);

  const firestoreDb = getFirestore(app);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);

  //
  useEffect(() => {
    if (data) setUserId(data.userId);
    if (userId)
      getUserInfo(firestoreDb, userId).then((data) => {
        setUserInfo(data);
        console.log(data);
      });
  }, [userId]);

  return (
    <li className="channels">
      <Link to={`/videoDetails/${data.id}`}>
        <video
          className="channels__video"
          src={data.videoUrl}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}></video>
      </Link>
      {/* <div className="channels__details"> */}
      <p>{data.title}</p>
      <Link to={`/userProfile/${userId}`}>
        <img
          className="channels__profile-img"
          src={userInfo?.photoURL ? userInfo?.photoURL : avatarProfile}
          alt=""
        />
        {/* <img src={user?.photoURL} alt="" /> */}
      </Link>
      <p> {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}</p>
      {/* cant get photo of particular individual */}
      {/* </div> */}
    </li>
  );
};

export default VideoPin;
