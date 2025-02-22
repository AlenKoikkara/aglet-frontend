import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./NavBar.scss";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HamburgerMenu from "./HamburgerMenu";
import FaceIcon from "@mui/icons-material/Face";
import { selectUser } from "../features/userSlice";
import logo from "../assets/images/logo.png";
import utils from "../utils";
import LoginDialog from "./LoginDialog";
import { selectCart } from "../features/cartSlice";
import CartDrawer from "./CartDrawer";
import { SearchBar } from "./SearchBar";
import { selectFav } from "../features/favSlice";

function NavBar() {
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const fav = useSelector(selectFav);

  const [hide, handleHide] = useState("top");
  const [prevScrollpos, setPrevScrollpos] = useState(0);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const navbarAnimation = () => {
    if (window.scrollY > prevScrollpos) {
      handleHide("navfadeout");
    } else {
      handleHide("navfadein");
    }
    setPrevScrollpos(window.scrollY);
    if (prevScrollpos < 50) {
      handleHide("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", navbarAnimation);
    return () => window.removeEventListener("scroll", navbarAnimation);
  }, [prevScrollpos]);

  return (
    <div className={`navbarWrapper ${hide}`}>
      <div className="wrapper">
        <div className="menuandlogo">
          <div className="navHamburger">
            <HamburgerMenu></HamburgerMenu>
          </div>
          <img
            loading="lazy"
            className="logo"
            onClick={() => navigate("/")}
            src={logo}
            alt=""
          ></img>
        </div>
        <div className="rightsideContent">
          <SearchBar></SearchBar>
          {fav.length > 0 && (
            <FavoriteBorderIcon
              onClick={() => navigate(`/user/favourites`)}
              fontSize={utils?.isMobile() ? "medium" : "large"}
            ></FavoriteBorderIcon>
          )}
          <div className="cartIcon">
            <CartDrawer setOpen={setOpen}></CartDrawer>
            {cart?.length > 0 && (
              <div className="cartCount">{cart?.length}</div>
            )}
          </div>
          {user?.emailId ? (
            <div onClick={() => navigate(`/user/profile`)} className="auth">
              <div className="profile">
                {utils.getUserInitial(user?.emailId)}
              </div>
            </div>
          ) : (
            <div onClick={() => handleClickOpen()} className="auth">
              <FaceIcon
                className="login"
                fontSize={utils?.isMobile() ? "medium" : "large"}
              ></FaceIcon>
            </div>
          )}
        </div>
        <div style={{ display: "none" }}>
          <LoginDialog open={open} setOpen={setOpen}></LoginDialog>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
