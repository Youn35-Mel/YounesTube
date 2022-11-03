import React, { useEffect, useState } from "react";
import SideNavBar from "../../components/SideNavBar/SideNavBar";
import { Routes, Route } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import Channels from "../../components/Channels/Channels";
import Saved from "../../components/Saved/Saved";
import Upload from "../../components/Upload/Upload";
import VideoPin from "../../components/VideoPin/VideoPin";
import UploadPageTwo from "../../components/UploadPageTwo/UploadPageTwo";
import VideoPinDetails from "../../components/VideoPinDetails/VideoPinDetails";
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
          <Route path="/userProfile/:userId" element={<Profile />} />
          <Route path="/channels" element={<Channels />} />
          <Route path="/videoDetails/:videoId" element={<VideoPinDetails />} />

          <Route path="/savedItems" element={<Saved />} />
          {/* <Route path="/upload" element={<Upload />} /> */}
          <Route path="/upload" element={<UploadPageTwo user={user} />} />

          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/videos/:id" element={<HomePage />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
