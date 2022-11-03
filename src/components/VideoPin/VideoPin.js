import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/fetchData";
import "./VideoPin.scss";
import { app } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";

const VideoPin = ({ data, user }) => {
  // console.log(data);

  const firestoreDb = getFirestore(app);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setId] = useState(null);

  // useEffect(() => {
  //   getUserInfo(firestoreDb).then((data) => {
  //     setUserInfo(data);
  //     console.log(data);
  //   });
  // }, [userInfo]);

  return (
    <li className="channels">
      <video
        className="channels__video"
        src={data.videoUrl}
        muted
        onMouseOver={(e) => e.target.play()}
        onMouseOut={(e) => e.target.pause()}></video>
      <div className="channels__details">
        <p>{data.title}</p>
        {/* <img src={user.photoURL} alt="" />   */}
        {/* cant get photo of particular individual */}
      </div>
    </li>
  );
};

export default VideoPin;
