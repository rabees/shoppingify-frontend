import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ListItems from "../components/Shoppingify/ListItems";
import Loading from "../components/Shared/Loading";
import { BsSearch } from "react-icons/bs";
import ItemServices from "../services/ItemServices";
import { addItem } from "../store/ItemSlice";
import { motion } from "framer-motion";
import Side from "./Side";
const Shoppingify = ({ showSide, setShowSide }) => {
  const [categories, setCategories] = useState([]);
  const { isLoading, error, data } = useQuery(["items"], () =>
    ItemServices.getItems()
  );
  const [filterName, setFilterName] = useState("");
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    dispatch(addItem(item));
  };

  const filterItems = (name) => {
    setFilterName(name);
  };

  useEffect(() => {
    if (!isLoading) {
      setCategories([...new Set(data.data.map((element) => element.category))]);
    }
  }, [isLoading]);

  return (
    <>
      <ShoppingContainer
        id="shopingContainer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, transition: { type: "tween", duration: 0.2 } }}
      >
        <Box>
          <Text
            fontSize="26px"
            fontWeight="700"
            lineHeight="2.25rem"
            margin="0px 0px 20px 0px"
          >
            <Span>Shoppingify</Span> allows you take your shopping list wherever
            you go
          </Text>
          <SearchBar>
            <BsSearch />
            <Input
              placeholder="Search Item"
              onChange={(e) => filterItems(e.target.value)}
            />
          </SearchBar>
        </Box>
        {isLoading && <Loading />}
        {categories?.map((category, index) => (
          <ListItems
            key={index}
            categoryName={category}
            setShowSide={setShowSide}
            items={data.data.filter(
              (item) =>
                item.category == category &&
                item.name.toLowerCase().includes(filterName.toLowerCase())
            )}
            addItemToCart={addItemToCart}
          />
        ))}
      </ShoppingContainer>
      <Side showSide={showSide} />
    </>
  );
};

const Box = styled.div`
  width: 100%;
  @media only screen and (min-width: 1200px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const SearchBar = styled.article`
  max-width: 275px;
  height: 50px;
  border-radius: 12px;
  background-color: white;
  min-height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  @media only screen and (min-width: 1200px) {
    max-width: 400px;
    flex: 1;
  }
`;

const Input = styled.input`
  border: none;
  width: 80%;
  :focus {
    outline: none;
  }
`;
const Span = styled.span`
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-primary);
`;
const Text = styled.p`
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "var(--font-size-md)"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : "auto")};
  max-width: 450px;
`;
const ShoppingContainer = styled(motion.section)`
  grid-area: content;
  padding: clamp(12.45px, 5.4px + 2.19vw, 37px);
  height: 100vh;
  overflow: auto;
`;

export default Shoppingify;
