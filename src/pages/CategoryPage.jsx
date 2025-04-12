import React, {useState, useEffect, lazy, Suspense} from "react";
import "./CategoryPage.scss";

import NavBar from "../components/layout/NavBar";
import { useSearchParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Footer from "../components/layout/Footer";

const ProductsWrapper = lazy(() => import('../components/product/ProductsWrapper'));

const CategoryPage = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // This effect is now empty since we're not using queryParam
    return () => {
      
    }
  }, [searchParams])
  
  return (
    <div className="body">
      <NavBar></NavBar>
      {searchParams?.get('category') && (
        <Suspense fallback={<LinearProgress />}>
          <ProductsWrapper
             title={searchParams?.get('category')}
          ></ProductsWrapper>
        </Suspense>
      )}
      <Footer></Footer>
    </div>
  );
};

export default CategoryPage;
