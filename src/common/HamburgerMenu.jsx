import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./HamburgerMenu.scss";

import { selectUser } from "../features/userSlice";

import LoginDialog from "./LoginDialog";
import utils from "../utils";

function HamburgerMenu() {
  const user = useSelector(selectUser);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }
  
  const navigateTo = (category) => {
    navigate(utils.getUrlWithParams("/products?", { category: category }));
  };

  const handleClick = () => {
    const element = document.getElementById("hamburger");
    const navWrapper = document.getElementById("navWrapper");
    if (clicked === true) {
      element.classList.remove("open");
      element.classList.add("closed");
      navWrapper.classList.add("closenav");
      navWrapper.classList.remove("opened");
      setClicked(false);
    } else {
      element.classList.remove("closed");
      element.classList.add("open");
      navWrapper.classList.add("opened");
      navWrapper.classList.remove("closenav");
      setClicked(true);
    }
  };

  return (
    <div className="hamburgerWrapper">
      <div
        onClick={() => handleClick()}
        id="hamburger"
        className="hamburger closed"
      >
        <div className="burger-main">
          <div className="burger-inner">
            <span className="top"></span>
            <span className="mid"></span>
            <span className="bot"></span>
          </div>
        </div>
      </div>
      <div id="navWrapper" className="navWrapper">
        <div className="navlink">
          <div className="mens">
            <a href={utils.getUrlWithParams("/products?", { category: 'Men' })} className="link">
              men
            </a>
          </div>
          <div className="womens">
            <a href={utils.getUrlWithParams("/products?", { category: 'Women' })} className="link">
              women
            </a>
          </div>
          <div className="kids">
            <a href={utils.getUrlWithParams("/products?", { category: 'Kids' })} className="link">
              kids
            </a>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <LoginDialog open={open} setOpen={setOpen}></LoginDialog>
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
