import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddAvatar from "../../assets/Images/addAvatar.png";
import "./Signup.scss";
import spaceVideo from "../../assets/video/Earth.mp4";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase-config";
import { limitToLast } from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  let navigate = useNavigate();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, { displayName: name });
    navigate("/");
  };
  return (
    <section>
      <div className="signup">
        <div className="signup__video-container">
          <video className="signup__video" autoPlay loop muted id="video">
            <source src={spaceVideo} type="video/mp4" />
          </video>
        </div>
        <div className="signup__formWrapper-container">
          <div className="signup__formWrapper">
            <h1 className="signup__title">Register</h1>
            <form onSubmit={handleSignup} className="signup__form">
              <label htmlFor="">Name</label>
              <input
                type="text"
                className="signup__name"
                placeholder="Enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label htmlFor="">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="signup__email"
                placeholder="email"
              />
              <label htmlFor="">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="signup__password"
                placeholder="password"
              />
              <input style={{ display: "none" }} type="file" id="file" />
              <label htmlFor="file">
                <img src={AddAvatar} alt="" />
                <span>Add an Avatar</span>
              </label>
              <button className="signup__button">Sign Up</button>
              <div>
                <p>Remember Me</p>
                <p>Need Help?</p>
              </div>
              <p>
                <span>Already have an Account?</span>
                <Link to="/login">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
