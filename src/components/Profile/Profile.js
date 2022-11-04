import React from "react";

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
