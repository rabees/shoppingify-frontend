import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ReactComponent as Logo } from "./../assets/logo.svg";
import {
  FaBars,
  FaArrowRight,
  FaChartLine,
  FaCartArrowDown,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = ({ setShowSide }) => {
  const [position, setPosition] = useState(4);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const items = useSelector((state) => state.items);
  useEffect(() => {
    if (items.length != 0) {
      const temp = items.reduce((prev, next) => prev + next.quantity, 0);
      setQuantity(temp);
    } else {
      setQuantity(0);
    }
  }, [items]);

  useEffect(() => {
    // console.log(quantity);
  }, [quantity]);

  const handleClick = (route, position) => {
    navigate(route);
    setPosition(position);
  };
  const findLocation = () => {
    const pathname = location.pathname;
    setPosition(1);
    pathname.includes("statistics") && setPosition(3);
    pathname.includes("history") && setPosition(2);
  };
  useEffect(() => {
    findLocation();
  }, []);

  return (
    <Nav>
      <Logo />
      <Menu>
        <Line position={position} />
        <IconContainer onClick={() => handleClick("/home", 1)}>
          <FaBars size={20} />
        </IconContainer>
        <IconContainer onClick={() => handleClick("/history", 2)}>
          <FaArrowRight size={20} />
        </IconContainer>
        <IconContainer onClick={() => handleClick("/statistics", 3)}>
          <FaChartLine size={20} />
        </IconContainer>
      </Menu>
      <Circle
        quantity={quantity}
        onClick={() => setShowSide((current) => !current)}
      >
        <FaCartArrowDown color="white" size={20} />
      </Circle>
    </Nav>
  );
};

const Circle = styled.div`
  display: grid;
  position: relative;
  place-content: center;
  width: 35px;
  height: 35px;
  background: var(--color-primary);
  border-radius: 50%;
  z-index: 10;
  @media only screen and (min-width: 800px) {
    width: 42px;
    height: 42px;
  }
  &::after {
    content: ${(props) => (props.quantity ? `"${props.quantity}"` : `"0"`)};
    position: absolute;
    top: -5px;
    right: -5px;
    border-radius: 4px;
    height: 20px;
    width: 20px;
    background-color: #eb5757;
    color: white;
    display: grid;
    place-content: center;
  }
`;
const Line = styled.div`
  position: absolute;
  left: 0px;
  top: ${(props) =>
    props.position == 1
      ? "0px"
      : props.position == 2
      ? "calc(60% - 45px)"
      : props.position == 3
      ? "calc(100% - 45px)"
      : props.position == 4 && "calc(60% - 45px)"};
  transition: top 0.3s ease;
  width: 6px;
  height: 45px;
  background: var(--color-primary);
  border-radius: 0px 4px 4px 0px;
`;
const IconContainer = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  place-content: center;
  cursor: pointer;
`;
const Nav = styled.nav`
  grid-area: nav;
  display: flex;
  position: fixed;
  height: 100vh;
  width: 42px;
  padding-block: 26px;
  z-index: 1;
  @media only screen and (min-width: 800px) {
    width: 80px;
  }
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
`;

const Menu = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  width: 100%;
  position: relative;
`;
export default Navbar;
