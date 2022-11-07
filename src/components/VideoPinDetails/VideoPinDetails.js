import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSpecificVideo } from "../../utils/fetchData";
import { app } from "../../firebase-config";
import { getFirestore, updateDoc, arrayUnion, doc } from "firebase/firestore";
import Spinner from "../../components/Spinner/Spinner";
import "./VideoPinDetails.scss";
import CommentAdd from "../commentAdd/CommentAdd";
import CommentItem from "../CommentItem/commentItem";
import { v4 as uuid } from "uuid";

///
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import requests from "../../Request";

const VideoPinDetails = ({ user }) => {
  const firebaseDb = getFirestore(app);

  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State to store the AddComment form data
  const [formComment, setFormComment] = useState("");

  const { videoId } = useParams();
  useEffect(() => {
    // console.log(videoId);
    if (videoId) {
      setLoading(true);
      getSpecificVideo(firebaseDb, videoId).then((data) => {
        console.log(data);
        setVideoInfo(data);
        setLoading(false);
        setFormSubmitted(false);
      });
    }
  }, [firebaseDb, videoId, formSubmitted]);

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // Adds a new comment to the database
  const submitHandler = async (e) => {
    e.preventDefault();

    const videoRef = doc(firebaseDb, "videos", videoId);

    await updateDoc(videoRef, {
      comments: arrayUnion({
        id: uuid(),
        timestamp: `${Date.now()}`,
        user_id: user.uid,
        text: formComment,
      }),
    });

    setFormSubmitted(true);
  };

  if (!videoInfo) return <Spinner />;

  return (
    <div className="video-container">
      <div className="video-container__left">
        <div className="video-container__left-top">
          <h2>{videoInfo?.title}</h2>
          <video
            className="VideoDetails__video"
            style={{ width: "50vw", height: "600px" }}
            controls>
            <source src={videoInfo?.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="video-container__left-bottom">
          <img src="https://via.placeholder.com/210/00FF00?text=1" />
          <img src="https://via.placeholder.com/220/00FF00?text=2" />
          <img src="https://via.placeholder.com/230/00FF00?text=3" />
          <img src="https://via.placeholder.com/240/00FF00?text=4" />
          <img src="https://via.placeholder.com/250/00FF00?text=5" />
          <img src="https://via.placeholder.com/260/00FF00?text=6" />
          <img src="https://via.placeholder.com/270/00FF00?text=7" />
          <img src="https://via.placeholder.com/280/00FF00?text=8" />
          <img src="https://via.placeholder.com/250/00FF00?text=9" />
          <img src="https://via.placeholder.com/260/00FF00?text=10" />
        </div>
      </div>
      <div className="video-container__right">
        <ul className="comments-list">
          {videoInfo.comments &&
            videoInfo.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment.text}
                timestamp={comment.timestamp}
                user={user}
              />
            ))}
          {!videoInfo.comments && <p>No comments...</p>}
        </ul>

        <CommentAdd
          user={user}
          setFormComment={setFormComment}
          submitHandler={submitHandler}
        />
      </div>
    </div>
  );
  // return (
  //   <section className="videoDetails-comments-container">
  //     <div className="videoDetails">
  //       <h2>{videoInfo?.title}</h2>
  //       <video
  //         className="VideoDetails__video"
  //         style={{ width: "50%", height: "600px" }}
  //         controls>
  //         <source src={videoInfo?.videoUrl} type="video/mp4" />
  //       </video>
  //       {/* <Player>
  //       <source src={videoInfo?.videoUrl} />
  //     </Player> */}
  //       {/* <button onClick={deleteButton}>Free Download</button> */}
  //     </div>
  //     <div className="comment Section">
  //       <CommentAdd />
  //     </div>
  //   </section>
  // );
};

export default VideoPinDetails;
