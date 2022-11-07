import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VideoCarousel.scss";

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
      </div>
    </div>
  );
};

export default VideoCarousel;
