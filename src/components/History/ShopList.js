import React from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useGetCategories } from "../../hooks/useItem";
import { useGetSingleList } from "../../hooks/useShopList";
import { addListToCart } from "../../store/ItemSlice";
import BackButton from "../Shared/BackButton";
import DateLabel from "../Shared/DateLabel";
import ListItems from "./ListItems";
import Side from "../../pages/Side";

const ShopList = ({ showSide }) => {
  let { id } = useParams();
  const { isLoading, data } = useGetSingleList(id);
  const { isLoading: isLoadingCategories, data: categories } =
    useGetCategories();
  const dispatch = useDispatch();
  const saveListToCart = () => {
    dispatch(addListToCart(data.data.items));
  };
  return (
    <>
      <ShopListContainer>
        <BackButton />
        <Box>
          <Title>{data?.data.name}</Title>
          <Button onClick={saveListToCart}>Add list to cart</Button>
        </Box>
        <DateLabel createdAt={data?.data.createdAt} />
        {!isLoadingCategories &&
          !isLoading &&
          categories?.data.map((category, index) => (
            <ListItems
              key={index}
              categoryName={category}
              setShowCart={null}
              addItemToCart={null}
              items={data.data.items.filter(
                (item) => item.category == category
              )}
            />
          ))}
      </ShopListContainer>
      <Side showSide={showSide} />
    </>
  );
};

const ShopListContainer = styled.section`
  grid-area: content;
  height: 100vh;
  padding: clamp(12.45px, 5.4px + 2.19vw, 37px);
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: var(--font-size-xl);
  line-height: 32px;
  color: #34333a;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: var(--color-primary);
  color: white;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  border: none;
  font-size: var(--font-size-md);
  line-height: 18px;
  font-weight: 700;
`;

export default ShopList;
