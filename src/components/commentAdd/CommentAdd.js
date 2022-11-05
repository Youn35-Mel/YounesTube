import React, { useEffect, useState } from "react";
import mohanMuruge from "../../assets/Images/profile.jpg";
import Button from "@mui/material/Button";
// import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./CommentAdd.scss";

const CommentAdd = ({ setFormComment, submitHandler, user }) => {
  return (
    <section className="new-comment">
      <div className="new-comment__comment-container">
        <img className="new-comment__user-img" src={user?.photoURL} alt="" />
        <div className="new-comment__form-container">
          <form
            onSubmit={(e) => submitHandler(e)}
            className="new-comment__form">
            <textarea
              name="textArea"
              className="new-comment__textarea"
              placeholder="Add a new comment"
              onChange={(e) => setFormComment(e.target.value)}></textarea>
            <button type="submit" className="new-comment__submit-btn">
              Submit
            </button>
            {/* <Button variant="contained">Send</Button> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CommentAdd;
