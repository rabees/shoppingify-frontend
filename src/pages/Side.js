import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AddItem from "../components/SideContent/AddItem/AddItem";
import ShoppingCart from "../components/SideContent/Cart/ShoppingCart";
import ViewItem from "../components/SideContent/ViewItem/ViewItem";
import { AnimatePresence } from "framer-motion";

const Side = ({ showSide }) => {
  const location = useLocation();
  const locationArr = location.pathname?.split("/") ?? [];
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={locationArr[3]}>
        <Route path="" element={<ShoppingCart showSide={showSide} />} />
        <Route path="add" element={<AddItem showSide={showSide} />} />
        <Route path="view/:itemId" element={<ViewItem showSide={showSide} />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Side;
