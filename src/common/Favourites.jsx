import React, { useEffect, useState } from "react";
import "./Favourites.scss";
import { useNavigate } from "react-router-dom";
import utils from "../utils";
import { selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFav } from "../features/favSlice";

function Favourites({ config }) {
  const user = useSelector(selectUser);
  const fav = useSelector(selectFav);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  function navigateTo(productId) {
    navigate(`/product/${productId}`);
  }

  useEffect(() => {
    utils.getFav(user, dispatch);
  }, []);

  return (
    <>
      {true && (
        <div className="categoryWrapper">
          <div className="titleContent">
            <div className="title">Favourites</div>
          </div>
          <div className="content">
            <div className="productsList">
              {fav?.map((product) => (
                <div
                  key={product._id}
                  className="productWrapper"
                  onClick={() => navigateTo(product.productId)}
                >
                  <div className="imgCart">
                    <img
                      loading="lazy"
                      className="shoeimg"
                      src={product.imageUrl}
                      alt={product.producName}
                    ></img>
                  </div>
                  <div className="shoedetails">
                    <div className="desc">
                      <div className="productname">{product.productName}</div>
                      <div className="division">{product.division}</div>
                    </div>
                    <div className="price">${product.listPrice}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Favourites;
