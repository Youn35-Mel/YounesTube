import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../firebase-config";

const Login = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const firebaseDb = getFirestore(app); //access to the firestore database

  const navigate = useNavigate();

  const login = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    // console.log(user);
    const { refreshToken, providerData } = user;

    localStorage.setItem("user", JSON.stringify(providerData));
    localStorage.setItem("accessToken", JSON.stringify(refreshToken));

    await setDoc(
      doc(firebaseDb, "users", providerData[0].uid),
      providerData[0]
    );

    navigate("/", { replace: true });
  };

  return (
    <div className="signup">
      <div className="signup__formWrapper-container">
        <div className="signup__formWrapper">
          <h1 className="signup__title">Login</h1>
          <button
            onClick={() => {
              login();
            }}
            className="signup__login-with-google-btn">
            Sign in with Google
          </button>
          <form
            // onSubmit={handleSubmit}
            className="signup__form">
            <label htmlFor="">Email</label>
            <input
              // onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="signup__email"
              placeholder="email"
            />
            <label htmlFor="">Password</label>
            <input
              // onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="signup__password"
              placeholder="password"
            />
            <input style={{ display: "none" }} type="file" id="file" />

            <button className="signup__button">Sign In</button>
            <div>
              <p>Remember Me</p>
              <p>Need Help?</p>
            </div>
            <p>
              <span>span New to YounesTube?</span>
              <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
