import React from "react";
import Logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import {
  BsHouseDoor,
  BsBookmark,
  BsPen,
  BsSearch,
  BsGear,
} from "react-icons/bs";
import { BiHelpCircle, BiLogOut, BiLogIn } from "react-icons/bi";
import "./SideBar.css";
import { getAuth, signOut } from "firebase/auth";

function SideBar({ toggleModal, user, sidebar, toggleSidebar }) {
  const location = useLocation();
  const auth = getAuth();

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <div
        className={sidebar ? "sidebar__overlay" : "sidebar__overlay--hidden"}
        onClick={sidebar ? toggleSidebar : undefined}
      />
      <div
        className={`sidebar ${sidebar ? "sidebar__opened" : "sidebar__closed"}`}
      >
        <Link to="/for-you" className="sidebar__logo--wrapper">
          <img src={Logo} alt="" className="sidebar__logo" />
        </Link>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <Link to="/for-you" className="sidebar__link">
              <div
                className={`sidebar__link--line ${
                  location.pathname === "/for-you" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <BsHouseDoor className="sidebar__icon" />
              </div>
              For You
            </Link>

            {/* change to libary next time */}
            <div className="sidebar__link sidebar__link--false">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <BsBookmark className="sidebar__icon" />
              </div>
              My Library
            </div>
            <div className="sidebar__link sidebar__link--false">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <BsPen className="sidebar__icon" />
              </div>
              Highlights
            </div>
            <div className="sidebar__link sidebar__link--false">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <BsSearch className="sidebar__icon" />
              </div>
              Search
            </div>
          </div>
          <div className="sidebar__bottom">
            <Link to="/settings" className="sidebar__link">
              <div
                className={`sidebar__link--line ${
                  location.pathname === "/settings" ? "active--tab" : ""
                }`}
              ></div>
              <div className="sidebar__icon--wrapper">
                <BsGear className="sidebar__icon" />
              </div>
              Settings
            </Link>
            <div className="sidebar__link sidebar__link--false">
              <div className="sidebar__link--line"></div>
              <div className="sidebar__icon--wrapper">
                <BiHelpCircle className="sidebar__icon" />
              </div>
              Help & Support
            </div>
            {user ? (
              <div className="sidebar__link" onClick={logout}>
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                  <BiLogOut className="sidebar__icon" />
                </div>
                Logout
              </div>
            ) : (
              <div className="sidebar__link" onClick={toggleModal}>
                <div className="sidebar__link--line"></div>
                <div className="sidebar__icon--wrapper">
                  <BiLogIn className="sidebar__icon" />
                </div>
                Login
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;