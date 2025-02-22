import React, { Suspense, lazy, useState } from "react";
// import SingleProduct from "../common/SingleProduct";
import NavBar from "../common/NavBar";
import { useEffect } from "react";
import axios from "../axios";
import requests from "../requests";

import "./ProductPage.scss";
import Footer from "../common/Footer";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const ProductPage = () => {
  const SingleProduct = lazy(() => import("../common/SingleProduct"));

  const [singleProduct, setSingleProduct] = useState();
  const [featured, setFeatured] = useState();

  let { id } = useParams();

  async function fetchSingleProduct() {
    await axios
      .get(requests.fetchProduct(id))
      .then((res) => {
        console.log(res);
        setSingleProduct(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  async function fetchFeatured() {
    await axios
      .get(requests?.fetchFeatured)
      .then((res) => {
        setFeatured(res.data);
        return res;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    fetchSingleProduct();
    fetchFeatured();
    return () => {};
  }, [id]);

  return (
    <div className="body">
      <NavBar></NavBar>
      <Suspense fallback={<LinearProgress color="inherit" />}>
        {singleProduct && (
          <SingleProduct
            config={{
              id: id,
              singleProduct: singleProduct,
              featured: featured,
              setSingleProduct: setSingleProduct,
            }}
          ></SingleProduct>
        )}
      </Suspense>
      <Footer></Footer>
    </div>
  );
};

export default ProductPage;
