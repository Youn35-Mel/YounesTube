import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSpecificVideo } from "../../utils/fetchData";
import { app } from "../../firebase-config";
import { getFirestore, updateDoc, arrayUnion, doc } from "firebase/firestore";
import Spinner from "../../components/Spinner/Spinner";
import "./VideoPinDetails.scss";
import ReactPlayer from "react-player";
import { Player } from "video-react";
import CommentAdd from "../commentAdd/CommentAdd";
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
            style={{ width: "50%", height: "600px" }}
            controls>
            <source src={videoInfo?.videoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="video-container__left-bottom">
          <h2 className="text-white font-bold md:text-xl p-4">Lists</h2>
          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={slideLeft}
              className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
            {/* <div
              id={"slider"}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
              {movies.map((item, id) => (
                <Movie key={id} item={item} />
              ))}
            </div> */}
            <MdChevronRight
              onClick={slideRight}
              className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
              size={40}
            />
          </div>
        </div>
      </div>
      <div className="video-container__right">
        <ul className="comments-list">
          {videoInfo.comments &&
            videoInfo.comments.map((comment) => (
              <p key={comment.id}>{comment.text}</p>
              // <CommentItem
              // key={comment.id}
              // commentData={comment}
              // submitHandler={props.submitHandler}
              // deleteBtn={props.deleteBtn}
              // />
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
