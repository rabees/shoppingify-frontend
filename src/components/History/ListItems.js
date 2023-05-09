import React from "react";
import styled from "styled-components";
const ListItems = ({ categoryName, items }) => {
  if (items.length != 0) {
    return (
      <List>
        <h5 className="title">{categoryName}</h5>
        <div className="categoryContainer">
          {items.map((item) => (
            <div className="item" key={item._id}>
              <p>{item.name}</p>
              <Quantity>{item.quantity} pcs</Quantity>
            </div>
          ))}
        </div>
      </List>
    );
  } else {
    return <></>;
  }
};

const Quantity = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: var(--color-primary);
`;
const List = styled.section`
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
