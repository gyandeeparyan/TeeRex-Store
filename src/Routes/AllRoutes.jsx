import React from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../Pages/CartPage";
import ProductList from "../Pages/HomePage";
import Error from "../components/Error";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </>
  );
}
