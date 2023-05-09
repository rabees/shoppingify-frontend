import React from "react";
import styled from "styled-components";
import Bars from "../components/Statistics/Bars";
import Graph from "../components/Statistics/Graph";
import {
  useGetTopSaleByField,
  useGetTopSaleByMonth,
} from "../hooks/useShopList";
import { motion } from "framer-motion";
import Side from "./Side";

const Statistics = ({ showSide }) => {
  const { isLoading: isLoadingItems, data: items } =
    useGetTopSaleByField("name");
  const { isLoading: isLoadingCategories, data: categories } =
    useGetTopSaleByField("category");
  const { isLoading: isLoadingMonth, data: month } = useGetTopSaleByMonth();

  return (
    <>
      <ShoppingContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, transition: { type: "tween", duration: 0.2 } }}
      >
        <ItemsSection>
          <Bars data={items?.data} color="#F9A109" title={"Items"} />
        </ItemsSection>
        <CategoriesSection>
          <Bars data={categories?.data} color="#56CCF2" title={"Categories"} />
        </CategoriesSection>
        <Graph data={month?.data} />
      </ShoppingContainer>
      <Side showSide={showSide} />
    </>
  );
};

const ShoppingContainer = styled(motion.main)`
  grid-area: content;
  height: 100vh;
  overflow: auto;
  padding: clamp(12.45px, 5.4px + 2.19vw, 37px);
  display: grid;
  grid-template-columns: 100%;
  grid-template-areas:
    "bars1"
    "bars2"
    "graph";
  height: 100vh;
  @media only screen and (min-width: 800px) {
    grid-template-columns: 50% 50%;
    grid-template-areas:
      "bars1 bars2"
      "graph graph";
  }
`;

const ItemsSection = styled.section`
  grid-area: bars1;
`;

const CategoriesSection = styled.section`
  grid-area: bars2;
`;

export default Statistics;
