import React from "react";
import { gertUserInfo, userUploadedVideos } from "../../utils/fetchData";

const Profile = ({ user }) => {
  return (
    <>
      <div className="profile">
        <img src={user?.photoURL} alt="" />
      </div>
    </>
  );
};

export default Profile;
