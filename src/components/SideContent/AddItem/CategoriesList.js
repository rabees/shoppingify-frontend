import React, { useEffect } from "react";
import styled from "styled-components";

const CategoriesList = ({ categories, setSelected }) => {
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <List>
      {categories.map((category) => (
        <CategoryItem key={category} onClick={() => setSelected(category)}>
          {category}
        </CategoryItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  position: absolute;
  top: calc(100% + 12.5px);
  background-color: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  width: 100%;
  padding: 8px;
`;

const CategoryItem = styled.li`
  min-height: 47px;
  display: flex;
  padding-left: 22px;
  align-items: center;
  border-radius: 12px;
  font-size: 18px;
  color: #828282;
  transition: all 0.3s ease;
  &:hover {
    background: #f2f2f2;
    color: #34333a;

    transition: all 0.3s ease;
  }
`;
export default CategoriesList;
