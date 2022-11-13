import React, { useEffect, useState } from "react";
import {
  deleteVideo,
  getUserInfo,
  userUploadedVideos,
} from "../../utils/fetchData";
import ProfileItem from "../ProfileItem/ProfileItem";
import { useParams } from "react-router-dom";
import { app, db, storage, auth } from "../../firebase-config";

import { useNavigate } from "react-router-dom";
import "./Profile.scss";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
const Profile = ({ user }) => {
  let navigate = useNavigate();
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    if (userId) {
      getUserInfo(db, userId).then((user) => {
        setUserInfo(user);
        // console.log(user);
      });
      userUploadedVideos(db, userId).then((feed) => {
        setFeeds(feed);
        // console.log(feed);
      });
    }
  }, [userId]);

  const deleteProfileVideo = async (videoId) => {
    console.log("delete");
    deleteVideo(db, videoId);
    userUploadedVideos(db, userId).then((feed) => {
      setFeeds(feed);
      // console.log(feed);
    });
  };
  return (
    <section className="profile">
      <div className="profile__background-img"></div>
      <div className="profile__img-container">
        <img className="profile__img" src={userInfo?.photoURL} alt="" />
        <h1>Channel</h1>
        <p className="title">{user.displayName}</p>
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
        <p>
          <button className="button-contact">Contact</button>
        </p>
      </div>
      <ul className="video__list">
        {feeds &&
          feeds.map((item) => {
            return (
              <ProfileItem
                key={item.id}
                item={item}
                deleteProfileVideo={deleteProfileVideo}
              />
            );
          })}
      </ul>
    </section>
  );
};

export default Profile;
