import React from "react";
import "./People.scss";
import messages from "../../assets/Icons/message.svg";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
const People = ({ data }) => {
  return (
    <div className="block">
      <div className="block__msgUser">
        <img className="block__image" src={data.photoURL} alt="" />
        <h2 className="block__name">{data.displayName}</h2>
        <div className="block__icons">
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
        </div>
        <Link to="/messages">
          <button className="block__msg">message</button>
        </Link>
      </div>
      <div className="block__videos-info">
        <div className="block__videos-info-container">
          <h4 className="block__video-info-title">Videos Uploaded</h4>
          <h5 className="block__video-info">5 </h5>
        </div>{" "}
        <div className="block__videos-info-container">
          <h4 className="block__video-info-title">Total Likes</h4>
          <h5 className="block__video-info">0 </h5>
        </div>{" "}
        <div className="block__videos-info-container">
          <h4 className="block__video-info-title">Total Followers</h4>
          <h5 className="block__video-info">0 </h5>
        </div>
      </div>
    </div>
  );
};

export default People;
