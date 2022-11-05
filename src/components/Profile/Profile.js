import React, { useEffect, useState } from "react";
import {
  gertUserInfo,
  getUserInfo,
  userUploadedVideos,
} from "../../utils/fetchData";
import ProfileItem from "../ProfileItem/ProfileItem";
import { useParams } from "react-router-dom";
import { app } from "../../firebase-config";
import { getFirestore, updateDoc, arrayUnion, doc } from "firebase/firestore";

const Profile = ({ user }) => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const fireStoreDb = getFirestore(app);

  useEffect(() => {
    if (userId) {
      getUserInfo(fireStoreDb, userId).then((user) => {
        setUserInfo(user);
        // console.log(user);
      });
      userUploadedVideos(fireStoreDb, userId).then((feed) => {
        setFeeds(feed);
        // console.log(feed);
      });
    }
  }, [userId]);

  return (
    <section className="profile">
      <div className="profile__img-container">
        <img className="profile__img" src={userInfo?.photoURL} alt="" />
      </div>
      <ul className="video__list">
        {feeds &&
          feeds.map((item) => {
            return <ProfileItem key={item.id} item={item} />;
          })}
      </ul>
    </section>
  );
};

export default Profile;
