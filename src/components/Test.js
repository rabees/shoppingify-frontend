import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Source } from "./../assets/source.svg";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { Routes, useNavigate } from "react-router-dom";
const ShoppingCart = () => {
  const items = useSelector((state) => state.items);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (items) {
      setCategories([...new Set(items.map((element) => element.category))]);
    }
  }, [items]);
  const dispatch = useDispatch();

  return (
    <Content>
      <Figure>
        <Section>
          <Source className="wineIcon" />
          <TitleContainer>
            <Text fontWeight="700" color="white" fontSize="16px">
              Didn't find <br />
              what you need?
            </Text>
            <Button onClick={() => navigate("/add")}> Add Item </Button>
          </TitleContainer>
        </Section>
      </Figure>
      <Text color="#34333a" fontSize="24px" margin="30px 0px">
        Shopping list
      </Text>
      {categories?.map((category, index) => (
        <React.Fragment key={index}>
          <Text color="#828282" fontSize="14px" margin="30px 0px 10px 0px">
            {category}
          </Text>
          {items
            ?.filter((item) => item.category == category)
            .map((item) => (
              <Item key={item._id} dispatch={dispatch} {...item} />
            ))}
        </React.Fragment>
      ))}
      {/* {items?.map((item) => (
          <>
            <Text color="#828282" fontSize="14px" margin="10px 0px">
              Fruit and vegetables
            </Text>
            <Item dispatch={dispatch} {...item} />
          </>
        ))} */}
    </Content>
  );
};

const Content = styled.section`
  height: 100%;
  width: clamp(250px, 233.4px + 4.1vw, 308px);
`;
const Text = styled.p`
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
  margin: ${(props) => (props.margin ? props.margin : "0px")}; ; ;
`;

const Button = styled.button`
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 10px 21px;
  border: none;
  font-size: 14px;
  line-height: 18px;
  color: #34333a;
`;
const TitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  width: 300px;
`;
const Figure = styled.figure`
  background: #80485b;
  height: 120px;
  width: 100%;
  /* width: clamp(250px, 233.4px + 4.1vw, 308px); */
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 13px;
  margin: 35px 0px;
`;
const ShoppingCartStyled = styled.aside`
  height: 100%;
  width: calc(100% - 42px);
  padding: 16.29px;
  display: flex;
  align-items: center;
  flex-direction: column;

  /* width: clamp(320px, 11.69vw + 220.57px, calc(100vw - 42px)); */
  background: #fff0de;
  position: absolute;
  left: ${(props) => (props.show ? "42px" : "-100%")};
  transition: left 0.4s ease;
  @media only screen and (min-width: 800px) {
    width: 450px;
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

const Title = styled.h4`
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  color: #34333a;
`;

const Subtitle = styled.h5`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: #828282;
`;

const NameItem = styled.p`
  font-size: 14px;
  line-height: 18px;
  color: #000000;
`;
export default ShoppingCart;
