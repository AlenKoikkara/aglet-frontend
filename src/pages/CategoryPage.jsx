import React, {useState, useEffect, lazy, Suspense} from "react";
import "./CategoryPage.scss";

import NavBar from "../components/layout/NavBar";
import { useSearchParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Footer from "../components/layout/Footer";

const CategoryPage = () => {
  const ProductsWrapper = lazy(() => import('../components/product/ProductsWrapper'));
  const [queryParam, setQueryParam] = useState(null);
  const [searchParams] = useSearchParams();
  
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
