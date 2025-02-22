import React from "react";
import "./Footer.scss";
import logo from "../assets/images/logo.png";
import utils from "../utils";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footerBody">
      <div className="leftside">
        <img className="logo" onClick={() => navigate("/")} src={logo} alt=""></img>
        <div className="useFulLinks">
          <div className="mens">
            <a
              href={utils.getUrlWithParams("/products?", { category: "Men" })}
              className="link"
            >
              men
            </a>
          </div>
          <div className="womens">
            <a
              href={utils.getUrlWithParams("/products?", { category: "Women" })}
              className="link"
            >
              women
            </a>
          </div>
          <div className="kids">
            <a
              href={utils.getUrlWithParams("/products?", { category: "Kids" })}
              className="link"
            >
              kids
            </a>
          </div>
        </div>
      </div>
      <div className="rightside">
        <a className="developer" href="https://bento.me/koikkara">@alenkoikkara</a>
      </div>
    </div>
  );
};

export default Footer;
