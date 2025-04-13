import React, { useEffect, useState } from "react";

import "./HomePage.scss";

import NavBar from "../components/layout/NavBar";
import HomepageBanner from "../components/product/HomepageBanner";
import ShoeCarousel from "../components/product/ShoeCarousel";
import requests from "../requests";
import FeatureBanner from "../components/product/FeatureBanner";
import axios from "../axios";
import Footer from "../components/layout/Footer";

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
