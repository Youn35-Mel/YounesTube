import React from "react";
import "./CommentItem.scss";
import moment from "moment";

const CommentItem = ({ comment, user, timestamp }) => {
  return (
    <div className="comment__default">
      <div className="comment__default-container-one">
        <div className="comment__header--image-one">
          <img
            className="comment__header--image-one"
            src={user?.photoURL}
            alt=""
          />
        </div>
      </div>
      <div className="comment__header">
        <p className="comment__header--name">name</p>
        <h4 className="comment__header--date">
          {moment(new Date(parseInt(timestamp)).toISOString()).fromNow()}
        </h4>
      </div>
      <div className="comment__text-container-default">
        <p className="comment__text-container-default--comment">{comment}</p>
      </div>
      <div className="comment__icon">
        <button className="comment__icon-btn" name="deleteID">
          {/* <FontAwesomeIcon icon={faTrash} /> */}
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
