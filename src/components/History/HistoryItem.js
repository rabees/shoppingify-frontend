import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import DateLabel from "../Shared/DateLabel";

const HistoryItem = ({ viewShopList, name, createdAt, id }) => {
  return (
    <Item onClick={() => viewShopList(id)}>
      <Text>{name}</Text>
      <Box>
        <DateLabel createdAt={createdAt} />
        <MdKeyboardArrowRight color="#F9A109" size="30" />
      </Box>
    </Item>
  );
};

const Item = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  min-height: 63.45px;
  padding: 10px 20px;
  @media only screen and (min-width: 525px) {
    flex-direction: row;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Text = styled.p`
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "var(--font-size-md)"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  max-width: 450px;
`;
export default HistoryItem;
