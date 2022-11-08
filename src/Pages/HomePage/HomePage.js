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
import Home from "../../components/Home/Home";
import Chat from "../../components/Chat/Chat";
import Record from "../../components/Record/Record";

const HomePage = ({ user }) => {
  return (
    <div className="App">
      <div className="App__sideBar">
        <SideNavBar user={user} />
      </div>
      <div className="App__pageSelected">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/userProfile/:userId"
            element={<Profile user={user} />}
          />
          <Route path="/channels" element={<Channels user={user} />} />
          <Route
            path="/videoDetails/:videoId"
            element={<VideoPinDetails user={user} />}
          />

          <Route path="/savedItems/:userId" element={<Saved user={user} />} />

          <Route path="/upload" element={<UploadPageTwo user={user} />} />
          <Route path="/messages" element={<Chat />} />
          <Route path="/record" element={<Record />} />
        </Routes>
      </div>
    </div>
  );
};

export default HomePage;
