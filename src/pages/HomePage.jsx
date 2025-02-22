import React, { useEffect, useState } from "react";

import "./HomePage.scss";

import NavBar from "../common/NavBar";
import HomepageBanner from "../common/HomepageBanner";
import ShoeCarousel from "../common/ShoeCarousel";
import requests from "../requests";
import FeatureBanner from "../common/FeatureBanner";
import Footer from "../common/Footer";
import axios from "../axios";

const HomePage = () => {
  const [basketballShoes, setBasketballshoes] = useState();
  const [airMax, setAirMaxshoes] = useState();

  async function fetchBasketBall() {
    await axios
      .get(
        requests?.fetchProducts(
          "limit=10&subCategory=Basketball&category=Shoes"
        )
      )
      .then((res) => {
        setBasketballshoes(res.data.products);
        return res;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function fetchAirMax() {
    await axios
      .get(requests?.fetchProducts("limit=10&productName=Nike Air Max Dn"))
      .then((res) => {
        setAirMaxshoes(res.data.products);
        return res;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    fetchBasketBall();
    fetchAirMax();
    return () => {};
  }, []);

  return (
    <div className="body">
      <NavBar></NavBar>
      <HomepageBanner></HomepageBanner>
      {basketballShoes && (
        <ShoeCarousel
          config={{ title: "BasketBall", shoes: basketballShoes }}
        ></ShoeCarousel>
      )}
      <FeatureBanner></FeatureBanner>
      {airMax && (
        <ShoeCarousel
          config={{ title: "Air Max", shoes: airMax }}
        ></ShoeCarousel>
      )}
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
