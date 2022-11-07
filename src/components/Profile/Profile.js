import React, { useEffect, useState } from "react";
import {
  deleteVideo,
  getUserInfo,
  userUploadedVideos,
} from "../../utils/fetchData";
import ProfileItem from "../ProfileItem/ProfileItem";
import { useParams } from "react-router-dom";
import { app, db, storage, auth } from "../../firebase-config";
import {
  getFirestore,
  updateDoc,
  arrayUnion,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import { useAuthState } from "react-firebase-hooks/auth";

const Profile = ({ user }) => {
  // const [user] = useAuthState(auth);

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
  };
  return (
    <section className="profile">
      <div className="profile__img-container">
        <img className="profile__img" src={userInfo?.photoURL} alt="" />
        <h1>Channel</h1>
        <p class="title">Lenny Guvnor</p>
        <a>
          <i class="fa fa-dribbble"></i>
        </a>
        <a>
          <i class="fa fa-twitter"></i>
        </a>
        <a>
          <i class="fa fa-linkedin"></i>
        </a>
        <a>
          <i class="fa fa-facebook"></i>
        </a>
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
