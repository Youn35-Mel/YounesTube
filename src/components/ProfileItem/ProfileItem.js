import React from "react";
import "./ProfileItem.scss";

const ProfileItem = ({ item }) => {
  return (
    <div
      onClick={() => {
        // props.sideClickHandler(props.user.id);
      }}>
      <li className="video-list__item">
        <video className="video-list__img" src={item?.videoUrl}></video>
        <div className="video-list__title-name-container">
          <h3 className="video-list__title">{item.title}</h3>
          <p className="video-list__channel"> {item.description}</p>
        </div>
      </li>
    </div>
  );
};

export default ProfileItem;
