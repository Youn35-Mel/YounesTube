import React, { useState } from "react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";

const SideNavBar = ({ user }) => {
  const [isExpanded, setExpendState] = useState(false);
  const menuItems = [
    {
      path: "/home",
      text: "Home",
      icon: "/icons/pie-chart.svg",
      id: 1,
    },
    {
      path: "/channels",
      text: "Channels",
      icon: "/icons/grid.svg",
      id: 2,
    },
    {
      path: `/userProfile/${user?.uid}`,
      text: "Profile",
      icon: "/icons/user.svg",
      id: 3,
    },
    {
      path: `/savedItems/${user?.uid}`,
      text: "Saved Items",
      icon: "/icons/heart.svg",
      id: 4,
    },
    {
      path: "/upload",
      text: "Upload",
      icon: "/icons/folder.svg",
      id: 5,
    },
    {
      path: "/messages",
      text: "Messages",
      icon: "/icons/message.svg",
      id: 6,
    },
    {
      path: "/record",
      text: "Record",
      icon: "/icons/play.svg",
      id: 6,
    },
  ];

  return (
    <div>
      <div
        className={
          isExpanded
            ? "side-nav-container"
            : "side-nav-container side-nav-container-NX"
        }>
        <div className="nav-upper">
          <div className="nav-heading">
            {isExpanded && (
              <div className="nav-brand">
                <img src="icons/Logo.svg" alt="" srcset="" />
                <h2>MeTube</h2>
              </div>
            )}
            <button
              className={
                isExpanded
                  ? "hamburger hamburger-in"
                  : "hamburger hamburger-out"
              }
              onClick={() => setExpendState(!isExpanded)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="nav-menu">
            {menuItems.map(({ path, text, icon, id }) => (
              <Link
                to={path}
                key={id}
                className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
                <img className="menu-item-icon" src={icon} alt="" />
                {isExpanded && <p>{text}</p>}
              </Link>
            ))}
          </div>
        </div>
        <div className="nav-footer">
          {isExpanded && (
            <div className="nav-details">
              <img
                className="nav-footer-avatar"
                src="icons/admin-avatar.svg"
                alt=""
              />
              <div className="nav-footer-info">
                <p className="nav-footer-user-name">YounesTube</p>
                <Link to="/login">
                  <p className="nav-footer-user-position">Sign Out</p>
                </Link>
              </div>
            </div>
          )}
          <img className="logout-icon" src="icons/logout.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
