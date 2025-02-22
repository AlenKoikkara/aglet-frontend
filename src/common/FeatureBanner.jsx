import React from "react";
import "./FeatureBanner.scss";
import video from "../assets/videos/feature.mp4";
import { Button } from "@mui/material";

function FeatureBanner({ title }) {
 
  return (
    <div className="featureBannerWrapper" >
        <div>
          <video autoPlay={true} muted loop>
            <source src={video} type="video/mp4" />
          </video>
          <div className="content">
            <div className="title">{title}</div>
            <div className="desc">For any and every look</div>
            <div className="buttons">
              <Button className="mens">Shop Mens</Button>
              <Button className="womens">Shop Womens</Button>
              <Button className="kids">Shop Kids</Button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default FeatureBanner;
