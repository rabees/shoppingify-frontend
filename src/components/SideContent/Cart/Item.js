import React, { useState } from "react";
import styled from "styled-components";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import {
  addQuantity,
  decreaseQuantity,
  deleteItem,
} from "../../../store/ItemSlice";
import { MdCheck } from "react-icons/md";
import { motion } from "framer-motion";
const Item = ({ editableMode, dispatch, name, _id, quantity }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <ItemContainer
      initial={{ y: -10 }}
      animate={{ y: 0 }}
      trasition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <Box>
        {editableMode && (
          <Checkbox onClick={() => setIsChecked(!isChecked)}>
            {isChecked && <MdCheck color="#f9a109" />}
          </Checkbox>
        )}

        <Text
          style={isChecked ? { textDecoration: "line-through" } : {}}
          color="black"
          fontSize="18px"
        >
          {name}
        </Text>
      </Box>
      <InputContainer background={isSelected ? "white" : "inherit"}>
        {isSelected && (
          <FaTrash
            className="clickeable"
            onClick={() => dispatch(deleteItem(_id))}
            color="#f9a10a"
          />
        )}
        {isSelected && (
          <FaMinus
            className="clickeable"
            onClick={() => dispatch(decreaseQuantity(_id))}
            color="#f9a10a"
          />
        )}
        <Quantity onClick={() => setIsSelected(!isSelected)}>
          <Text color="#F9A10A" fontSize="12px">
            {quantity} pcs
          </Text>
        </Quantity>
        {isSelected && (
          <FaPlus
            className="clickeable"
            onClick={() => dispatch(addQuantity(_id))}
            color="#f9a10a"
          />
        )}
      </InputContainer>
    </ItemContainer>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;
const Checkbox = styled.div`
  border: 2.5px solid var(--color-primary);
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: grid;
  place-content: center;
  cursor: pointer;
`;
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px;
  border-radius: 12px;
  background-color: ${(props) =>
    props.background ? props.background : "inherit"};
`;
const ItemContainer = styled(motion.article)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: clamp(250px, 233.4px + 4.1vw, 308px);
  .clickeable {
    cursor: pointer;
  }
`;
const Quantity = styled.button`
  display: grid;
  place-content: center;
  background-color: inherit;
  border: 2px solid var(--color-primary);
  border-radius: 24px;
  width: 68px;
  height: 32px;
  padding: 10px 10px;
  text-align: center;
  color: #f9a10a;
`;
const Text = styled.p`
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "var(--font-size-md)"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
`;
export default Item;
