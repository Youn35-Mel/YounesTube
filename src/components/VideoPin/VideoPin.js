import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../utils/fetchData";
import "./VideoPin.scss";
import { app } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import moment from "moment";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const avatarProfile =
  "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png";

const VideoPin = ({ data, user }) => {
  // console.log(data);

  const firestoreDb = getFirestore(app);
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);

  // const saveShow = async () => {
  //   if (user?.email) {
  //     setLike(!like);
  //     setSaved(true);
  //     await updateDoc("videos", {
  //       savedShows: arrayUnion({
  //         // id: item.id,
  //         // title: item.title,
  //         // img: item.backdrop_path,
  //       }),
  //     });
  //   } else {
  //     alert("Please log in to save a movie");
  //   }
  // };
  //
  useEffect(() => {
    if (data) setUserId(data.userId);
    if (userId)
      getUserInfo(firestoreDb, userId).then((data) => {
        setUserInfo(data);
        console.log(data);
      });
  }, [userId]);

  let arrayPin = ["small", "medium", "large"];
  let pinSize = arrayPin[Math.floor(Math.random() * arrayPin.length)];
  console.log(pinSize);

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
            {like ? (
              <FaHeart className="channel__heart" />
            ) : (
              <FaRegHeart className="channel__heart" />
            )}
          </p>
        </div>
      </div>
    </div>
    // <li className="channels">
    // <Link to={`/videoDetails/${data.id}`}>
    //   <video
    //     className="channels__video"
    //     src={data.videoUrl}
    //     muted
    //     onMouseOver={(e) => e.target.play()}
    //     onMouseOut={(e) => e.target.pause()}></video>
    // </Link>
    //   {/* <div className="channels__details"> */}
    //   <p>{data.title}</p>
    //   <Link to={`/userProfile/${userId}`}>
    //     <img
    //       className="channels__profile-img"
    //       src={userInfo?.photoURL ? userInfo?.photoURL : avatarProfile}
    //       alt=""
    //     />
    //     {/* <img src={user?.photoURL} alt="" /> */}
    //   </Link>
    //   <p> {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}</p>
    //   <p
    //   // onClick={saveShow}
    //   >
    //     {like ? (
    //       <FaHeart className="absolute top-4 left-4 text-gray-300" />
    //     ) : (
    //       <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
    //     )}
    //   </p>
    // </li>
  );
};

export default VideoPin;
