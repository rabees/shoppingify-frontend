import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)}>
      <FaLongArrowAltLeft color="#f9a109" />
      back
    </Button>
  );
};

const Button = styled.button`
  color: var(--color-primary);
  background-color: inherit;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export default BackButton;
