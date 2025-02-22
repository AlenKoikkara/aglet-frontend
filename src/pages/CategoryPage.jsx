import React, {useState, useEffect, lazy, Suspense} from "react";
import "./CategoryPage.scss";
import requests from "../requests";

import NavBar from "../common/NavBar";
import { useLocation, useSearchParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Footer from "../common/Footer";

const CategoryPage = () => {
  const ProductsWrapper = lazy(() => import('../common/ProductsWrapper'));
  const [queryParam, setQueryParam] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    
    const param = searchParams.get('category');
    setQueryParam(param);
    return () => {
      
    }
  }, [queryParam])
  
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
