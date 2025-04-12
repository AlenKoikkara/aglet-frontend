import React, { Suspense, lazy, useState, useEffect, useCallback } from "react";
// import SingleProduct from "../common/SingleProduct";
import NavBar from "../components/layout/NavBar";
import axios from "../axios";
import requests from "../requests";

import "./ProductPage.scss";
import Footer from "../components/layout/Footer";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";

const SingleProduct = lazy(() => import("../components/product/SingleProduct"));

const ProductPage = () => {
  const [singleProduct, setSingleProduct] = useState();
  const [featured, setFeatured] = useState();

  let { id } = useParams();

  const fetchSingleProduct = useCallback(async () => {
    await axios
      .get(requests.fetchProduct(id))
      .then((res) => {
        console.log(res);
        setSingleProduct(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id]);

  const fetchFeatured = useCallback(async () => {
    await axios
      .get(requests?.fetchFeatured)
      .then((res) => {
        setFeatured(res.data);
        return res;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    fetchSingleProduct();
    fetchFeatured();
    return () => {};
  }, [id, fetchSingleProduct, fetchFeatured]);

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
            }}
          ></SingleProduct>
        )}
      </Suspense>
      <Footer></Footer>
    </div>
  );
};

export default ProductPage;
