import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import ItemServices from "../../../services/ItemServices";
import { addItem, deleteItem } from "../../../store/ItemSlice";
import { useDeleteItem } from "../../../hooks/useItem";
import { motion } from "framer-motion";
const ViewItem = ({ showSide }) => {
  let { itemId } = useParams();
  const { isLoading, error, data } = useQuery([itemId], () =>
    ItemServices.getSingleItem(itemId)
  );
  const { mutate } = useDeleteItem();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItemToCart = (item) => {
    dispatch(addItem(item));
  };

  const eliminateItem = (id) => {
    mutate(id);
    dispatch(deleteItem(id));
    navigate("/home");
  };

  return (
    <ShoppingCartStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, transition: { type: "tween", duration: 0.2 } }}
      showSide={showSide}
    >
      <Content>
        <BackButton onClick={() => navigate("/home")}>
          <FaLongArrowAltLeft color="#f9a109" />
          <Text color="#f9a109" fontWeight="700" fontSize="0.875rem">
            back
          </Text>
        </BackButton>
        {!isLoading && (
          <>
            <Img src={data.data.img} />
            <Text color="#C1C1C4" fontSize="0.75rem" margin="0px 0px 11px 0px">
              Name
            </Text>
            <Text textAlign="left" fontSize="1.5rem" margin="0px 0px 33px 0px">
              {data.data.name}
            </Text>
            <Text color="#C1C1C4" fontSize="0.75rem" margin="0px 0px 11px 0px">
              Category
            </Text>
            <Text textAlign="left" margin="0px 0px 33px 0px">
              {data.data.category}
            </Text>
            <Text color="#C1C1C4" fontSize="0.75rem" margin="0px 0px 11px 0px">
              Note
            </Text>
            <Text textAlign="left" margin="0px 0px 33px 0px" minHeight="40px">
              {data.data.note}
            </Text>

            <Box>
              <Button
                onClick={() => eliminateItem(data.data._id)}
                backgroundColor="inherit"
                color="#34333A"
              >
                delete
              </Button>
              <Button
                onClick={() => addItemToCart(data.data)}
                backgroundColor="#F9A109"
                color="white"
              >
                Add to list
              </Button>
            </Box>
          </>
        )}
      </Content>
    </ShoppingCartStyled>
  );
};

const Img = styled.img`
  width: 300px;
  height: 219px;
  border-radius: 12px;
  margin-bottom: 53px;
`;
const BackButton = styled.button`
  color: var(--color-primary);
  background-color: inherit;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 34px;
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 25px;
  margin-top: 34px;
`;
const Content = styled.section`
  height: 100%;
  width: clamp(250px, 233.4px + 4.1vw, 308px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;

const Text = styled.label`
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.125rem")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  min-height: ${(props) => (props.minHeight ? props.minHeight : "auto")};

  width: 100%;
  &:focus-within {
    color: var(--color-primary) !important;
  }
`;

const Button = styled.button`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 12px;
  padding: 20px 20px;
  font-weight: 700;
  border: none;
  font-size: var(--font-size-md);
  line-height: 18px;
  width: 123px;
`;

const ShoppingCartStyled = styled(motion.aside)`
  height: 100%;
  width: calc(100% - 52px);
  padding: 16.29px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  background: white;
  position: fixed;
  left: ${(props) => (props.showSide ? "52px" : "-100%")};
  transition: left 0.4s ease;
  @media only screen and (min-width: 800px) {
    width: 389px;
    right: 0px;
    left: auto;
    grid-area: side;
    position: fixed;
  }

  .wineIcon {
    position: absolute;
    left: -0px;
    top: -29px;
    height: 120px;
  }
`;

export default ViewItem;
