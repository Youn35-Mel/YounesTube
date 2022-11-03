import React, { useState } from "react";
import "./SideNavBar.css";
import { Link } from "react-router-dom";

const SideNavBar = ({ user }) => {
  const [isExpanded, setExpendState] = useState(false);
  const menuItems = [
    {
      path: "/home",
      text: "Home",
      icon: "icons/grid.svg",
    },
    {
      path: "/channels",
      text: "Channels",
      icon: "icons/grid.svg",
    },
    {
      path: "/profile",
      text: "Profile",
      icon: "icons/user.svg",
    },

    // {
    //   path: "/orders",
    //   text: "Orders",
    //   icon: "icons/shopping-cart.svg",
    // },
    {
      path: "/savedItems",
      text: "Saved Items",
      icon: "icons/heart.svg",
    },
    {
      path: "/upload",
      text: "Upload",
      icon: "icons/folder.svg",
    },
    {
      path: "/messages",
      text: "Messages",
      icon: "icons/message.svg",
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
                <h2>Showkart</h2>
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
            {menuItems.map(({ path, text, icon }) => (
              <Link to={path}>
                <a
                  className={
                    isExpanded ? "menu-item" : "menu-item menu-item-NX"
                  }
                  href="#">
                  <img className="menu-item-icon" src={icon} alt="" srcset="" />
                  {isExpanded && <p>{text}</p>}
                </a>
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
                srcset=""
              />
              <div className="nav-footer-info">
                <p className="nav-footer-user-name">YounesTube</p>
                <Link to="/login">
                  <p className="nav-footer-user-position">Sign Out</p>
                </Link>
              </div>
            </div>
          )}
          <img
            className="logout-icon"
            src="icons/logout.svg"
            alt=""
            srcset=""
          />
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
