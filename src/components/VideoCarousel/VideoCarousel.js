import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VideoCarousel.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const VideoCarousel = ({ item }) => {
  return (
    <div className="video-carousel">
      <div className="video-carousel__video-container">
        <Link to={`/videoDetails/${item?.id}`}>
          <video
            className="video-carousel__video"
            src={item?.videoUrl}
            onMouseOver={(e) => e.target.play()}
            onMouseOut={(e) => e.target.pause()}></video>
        </Link>
      </div>
      <div className="video-carousel__info">
        <p className="video-carousel__description">{item?.description}</p>
        <div className="video-carousel__description-icons">
          <p className="video-carousel__description">
            <CommentIcon /> {item.comments.length} comments
          </p>
          <p className="video-carousel__description">
            <ThumbUpIcon /> {item.likes.length} likes
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
