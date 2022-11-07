import React from "react";
import "./People.scss";
import messages from "../../assets/Icons/message.svg";
import { Link } from "react-router-dom";

const People = ({ data }) => {
  return (
    <div className="block">
      <h2 className="block__name">{data.displayName}</h2>
      <div className="block__msgUser">
        <img className="block__image" src={data.photoURL} alt="" />
        <Link to="/messages">
          <img className="block__msg-icon" src={messages} />
        </Link>
      </div>
    </div>
  );
};

export default People;
