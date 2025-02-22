import React, { useEffect, useState } from "react";
import "./FeaturedCarousel.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import requests from "../requests";
import axios from "../axios";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";

const FeaturedCarousel = () => {
  const [featuredProduct, setFeaturedProduct] = useState();

  async function fetchData() {
    const featureObj = {
      category: "Shoes",
      featured: true,
    };
    await axios
      .get(requests.fetchFeatured, featureObj)
      .then((res) => {
        setFeaturedProduct(res.data);
        return res;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    fetchData();
  }, [requests.fetchFeatured]);

  return (
    <div className="featuredCarousel">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 7000 }}
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        className="mySwiper"
        modules={[EffectCreative, Pagination]}
        pagination={true}
      >
        {featuredProduct?.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="carouselContent">
              <img className="contentImage" src={product.imageUrl}></img>
              <div className="featuredcontent">
                <div className="description">
                  <div className="brandName">{product.company}</div>
                  <div className="productName">{product.productName}</div>
                  <div className="producttype">{product.division}</div>
                </div>
                <div className="cartandprice">
                  <div>${product.listPrice}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedCarousel;
