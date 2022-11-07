import React, { useState } from "react";
import "./CommentItem.scss";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../../firebase-config";

const CommentItem = ({
  comment,
  user,
  timestamp,
  deleteComment,
  userInfo,
  key,
  author,
}) => {
  // const [user] = useAuthState(auth);

  return (
    <div className="comment__default">
      <div className="comment__default-container-one">
        <div className="comment__header--image-one">
          <img
            className="comment__header--image-one"
            src={userInfo?.photoURL}
            alt=""
          />
        </div>
      </div>
      <div className="comment__header">
        <p className="comment__header--name">{author}</p>
        <h4 className="comment__header--date">
          {moment(new Date(parseInt(timestamp)).toISOString()).fromNow()}
        </h4>
      </div>
      <div className="comment__text-container-default">
        <p className="comment__text-container-default--comment">{comment}</p>
      </div>
      <div className="comment__icon">
        <button
          onClick={() => {
            deleteComment(key);
          }}
          className="comment__icon-btn"
          name="deleteID">
          {/* <FontAwesomeIcon icon={faTrash} /> */}
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
