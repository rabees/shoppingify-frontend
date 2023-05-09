import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
const ListItems = ({ categoryName, items, addItemToCart, setShowSide }) => {
  const navigate = useNavigate();

  const variantsUL = {
    closed: {
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
    open: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variantsLI = {
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  if (items.length != 0) {
    return (
      <List>
        <h5 className="title">{categoryName}</h5>
        <motion.ul
          variants={variantsUL}
          initial="closed"
          animate="open"
          className="categoryContainer"
        >
          <AnimatePresence>
            {items.map((item) => (
              <motion.li
                variants={variantsLI}
                className="item clickeable"
                key={item._id}
              >
                <p
                  onClick={() => {
                    navigate("view/" + item._id);
                    setShowSide(true);
                  }}
                >
                  {item.name}
                </p>
                <FaPlus onClick={() => addItemToCart(item)} color="#c1c1c4" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </List>
    );
  } else {
    return <></>;
  }
};

const List = styled(motion.section)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 38px;
  .title {
    font-size: 18px;
    line-height: 22px;
  }
  .clickeable {
    cursor: pointer;
  }
  .categoryContainer {
    display: grid;
    grid-row-gap: 1.5rem;
    grid-column-gap: 0.5rem;
    margin-top: 18px;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    @media only screen and (min-width: 800px) {
      grid-template-columns: repeat(auto-fill, minmax(11.375rem, 1fr));
      grid-row-gap: 2rem;
      grid-column-gap: 1rem;
    }
  }
  .item {
    width: 100%;
    min-height: 50px;
    word-break: break-all;
    padding: 1rem 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    font-size: 0.875rem;
    background-color: white;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    @media only screen and (min-width: 800px) {
      font-size: 1rem;
    }
  }
`;
export default ListItems;
