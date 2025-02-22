import React, { lazy, useRef, useState } from "react";

import "./ShoeCarousel.scss";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Line from "./Line";
import utils from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectFav } from "../features/favSlice";

const LoginDialog = lazy(() => import("./LoginDialog"));
function ShoeCarousel({ config }) {
  const [open, setOpen] = useState(false);
  const scrollable = useRef(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const fav = useSelector(selectFav);
  const dispatch = useDispatch();

  const scrollIt = (toRight) => {
    const scrollLength = 1000;
    scrollable.current.scrollBy({
      left: scrollLength * (toRight ? 1 : -1),
      behavior: "smooth",
    });
  };

  function handleFav(shoe) {
    if (user) {
      utils.toggleFav(user, shoe, dispatch);
    }
    if (!user) {
      setOpen(true)
    }
  }

  function navigateTo(productId) {
    navigate(`/product/${productId}`);
  }

  return (
    <div className="shoeCarouselWrapper">
      <div className="title">{config?.title}</div>
      <Line></Line>
      <ChevronLeftRoundedIcon
        onClick={() => scrollIt(false)}
        className="leftslide"
        fontSize="large"
      ></ChevronLeftRoundedIcon>
      <div className="shoeRows" ref={scrollable}>
        {config.shoes?.map((shoe) => (
          <div key={shoe._id} className="productWrapper">
            <div className="imgCart">
              <img
                onClick={() => navigateTo(shoe._id)}
                loading="lazy"
                className="shoeimg"
                src={shoe.imageUrl}
                alt={shoe.producName}
              ></img>
              <div className="favIcon" onClick={() => {handleFav(shoe)}}>
                {fav?.find((item) => item.productId === shoe._id) ? <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}
              </div>
            </div>
            <div className="shoedetails">
              <div className="desc">
                <div className="productname">{shoe.productName}</div>
                <div className="division">{shoe.division}</div>
              </div>
              <div className="price">${shoe.listPrice}</div>
            </div>
          </div>
        ))}
      </div>
      <ChevronRightRoundedIcon
        onClick={() => scrollIt(true)}
        className="rightslide"
        fontSize="large"
      ></ChevronRightRoundedIcon>
       <div style={{ display: "none" }}>
          <LoginDialog open={open} setOpen={setOpen}></LoginDialog>
      </div>
    </div>
  );
}

export default ShoeCarousel;
