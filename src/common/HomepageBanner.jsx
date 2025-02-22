import React from "react";

import "./HomepageBanner.scss";
import FeaturedCarousel from "./FeaturedCarousel";
import utils from "../utils";

const HomepageBanner = () => {
  return (
    <header className="bannerHeader">
      <div className="content">
        <div className="title1">find the</div>
        <div className="title2">Perfect <span className="shoeword">shoe.</span></div>
        <div className="desc">
          Step into a world where every shoe has a story and every sole has a
          goal.
        </div>
      </div>
    </header>
  );
};

export default HomepageBanner;
