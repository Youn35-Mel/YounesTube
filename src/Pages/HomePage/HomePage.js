import React from "react";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { Routes, Route } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import Channels from "../../components/Channels/Channels";
import Saved from "../../components/Saved/Saved";
import Upload from "../../components/Upload/Upload";
import VideoPin from "../../components/VideoPin/VideoPin";
import UploadPageTwo from "../../components/UploadPageTwo/UploadPageTwo";
import "./HomePage.scss";

const HomePage = ({ user }) => {
  return (
    <div className="App">
      <div className="App__sideBar">
        <SideNavBar user={user} />
      </div>
      <div className="App__pageSelected">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/channel" element={<Channels />} />
          <Route path="/channel/:id" element={<Channels />} />
          <Route path="/savedItems" element={<Saved />} />
          {/* <Route path="/upload" element={<Upload />} /> */}
          <Route path="/upload" element={<UploadPageTwo />} />
          <Route path="/videoDetail/:videoId" element={<VideoPin />} />

          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/videos/:id" element={<HomePage />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
