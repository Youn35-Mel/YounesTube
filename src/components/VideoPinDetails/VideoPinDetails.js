import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSpecificVideo } from "../../utils/fetchData";
import { app } from "../../firebase-config";
import { getFirestore } from "firebase/firestore";
import Spinner from "../../components/Spinner/Spinner";
import "./VideoPinDetails.scss";
import ReactPlayer from "react-player";
import { Player } from "video-react";

const VideoPinDetails = () => {
  const firestoreDb = getFirestore(app);

  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);

  const { videoId } = useParams();
  useEffect(() => {
    // console.log(videoId);
    if (videoId) {
      setLoading(true);
      getSpecificVideo(firestoreDb, videoId).then((data) => {
        console.log(data);
        setVideoInfo(data);
        setLoading(false);
      });
    }
  }, [videoId]);

  const deleteButton = () => {
    console.log("video delete clicked");
    setVideoInfo(null);
  };

  if (loading) return <Spinner />;

  return (
    <div className="videoDetails">
      <h2>{videoInfo?.title}</h2>
      <video
        className="VideoDetails__video"
        style={{ width: "100%", height: "600px" }}
        controls>
        <source src={videoInfo?.videoUrl} type="video/mp4" />
      </video>
      {/* <Player>
        <source src={videoInfo?.videoUrl} />
      </Player> */}
      <button onClick={deleteButton}>Free Download</button>
      <input className="" type="text" />
    </div>
  );
};

export default VideoPinDetails;
