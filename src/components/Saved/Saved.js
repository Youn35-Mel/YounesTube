import React, { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { useParams } from "react-router-dom";
import { getUserSavedVideo } from "../../utils/fetchData";
import "./Saved.scss";

/// to  be tested
const Saved = ({ user }) => {
  const { userId } = useParams();
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    getUserSavedVideo(db, userId).then((data) => {
      setFeeds(data);
    });
    // getAllSavedVideos(db).then((data) => {
    //   setFeeds(data);
    //   console.log(data);
    // });
  }, []);

  return (
    <div>
      {feeds &&
        feeds.map((item) => {
          return (
            <div className="saved" key={item.id}>
              <video className="saved__vid" src={item.videoUrl}></video>
            </div>
          );
        })}
    </div>
  );
};

export default Saved;
