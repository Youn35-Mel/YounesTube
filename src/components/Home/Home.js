import React from "react";
import spaceVideo from "../../assets/video/Earth.mp4";
import "./Home.scss";
const Home = () => {
  return (
    <>
      <video className="video" autoPlay loop muted id="video">
        <source src={spaceVideo} type="video/mp4" />
      </video>
    </>
  );
};

export default Home;
