import React, { useEffect, lazy, Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "./features/userSlice";
import ProtectedRoutes from "./components/layout/ProtectedRoutes";
import PageNotFound from "./components/layout/PageNotFound";
import utils from "./utils";
import { addCart } from "./features/cartSlice";
import { LinearProgress } from "@mui/material";

const HomePage = lazy(() => import("./pages/HomePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const UserPage = lazy(() => import("./pages/UserPage"));

function App() {
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      dispatch(
        login({
          userId: user.userId,
          emailId: user.emailId,
        })
      );
      utils.getCart(user, dispatch);
      utils.getFav(user, dispatch);
    }
    if (!user) {
      const cart = JSON.parse(sessionStorage.getItem("cart"));
      dispatch(addCart(cart));
    }
    return () => {};
  }, [dispatch, user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense
          fallback={
            <LinearProgress color="inherit" className="linearprogress" />
          }
        >
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/user" element={<UserPage />}>
                <Route path="/user/favourites" element={<UserPage />} />
                <Route path="/user/profile" element={<UserPage />} />
              </Route>
            </Route>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/products" element={<CategoryPage key="products" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
