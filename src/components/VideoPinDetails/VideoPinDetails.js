import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAllFeeds,
  getSpecificVideo,
  getUserInfo,
} from "../../utils/fetchData";
import { app, auth } from "../../firebase-config";

import {
  getFirestore,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Spinner from "../../components/Spinner/Spinner";
import "./VideoPinDetails.scss";
import CommentAdd from "../commentAdd/CommentAdd";
import CommentItem from "../CommentItem/commentItem";
import VideoCarousel from "../VideoCarousel/VideoCarousel";
import { v4 as uuid } from "uuid";

///
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import requests from "../../Request";

import Slider from "react-slick";

const VideoPinDetails = ({ user }) => {
  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const firebaseDb = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [nextVideo, setNextVideo] = useState(false);
  const [feeds, setFeeds] = useState(null);

  useEffect(() => {
    //fetch the data
    getAllFeeds(firebaseDb).then((data) => {
      setFeeds(data);
      // console.log(data);
    });
  }, []);

  // State to store the AddComment form data
  const [formComment, setFormComment] = useState("");

  //store user for comment
  const [userInfo, setUserInfo] = useState(null);

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
        setNextVideo(true);

        //get userinfo for the comments
        // getUserInfo(firebaseDb, data.userId).then((user) => {
        //   setUserInfo(user);
        // });
      });
    }
  }, [firebaseDb, videoId, formSubmitted, nextVideo]);

  // Adds a new comment to the database
  const submitHandler = async (e) => {
    e.preventDefault();

    const videoRef = doc(firebaseDb, "videos", videoId);

    await updateDoc(videoRef, {
      comments: arrayUnion({
        id: uuid(),
        timestamp: `${Date.now()}`,
        // user_id: user.uid,
        text: formComment,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
      }),
    });

    setFormSubmitted(true);
  };

  //delete comment
  const deleteRef = doc(firebaseDb, "videos", videoId);
  const deleteComment = async (key) => {
    const postDoc = doc(firebaseDb, "videos", key);
    await deleteDoc(postDoc);
  };

  // delete comment function
  // const deleteComment = (comment) => {
  //   console.log(comment);
  //   updateDoc(commentRef, {
  //     comments: arrayRemove(comment),
  //   })
  //     .then((e) => {
  //       console.log(e);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //like comment
  // const handleLike = () => {};

  if (!videoInfo) return <Spinner />;

  return (
    <div className="video-container">
      <div className="video-container__left">
        <div className="video-container__left-top">
          <h2>{videoInfo?.title}</h2>
          <video
            className="VideoDetails__video"
            style={{ width: "50vw", height: "600px" }}
            controls
            key={videoInfo?.videoUrl}>
            <source src={videoInfo?.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="video-container__left-bottom">
          <Slider {...settings}>
            {feeds &&
              feeds.map((item) => {
                return <VideoCarousel key={item.id} item={item} />;
              })}
          </Slider>
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
                userInfo={userInfo}
                deleteComment={deleteComment}
                author={comment.author.name}
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
};

export default VideoPinDetails;
