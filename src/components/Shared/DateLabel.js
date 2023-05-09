import React from "react";
import { MdDateRange } from "react-icons/md";
import moment from "moment";
import styled from "styled-components";

const DateLabel = ({ createdAt }) => {
  return (
    <Box>
      <DateIcon color="#C1C1C4" />
      <Text color="#C1C1C4" fontSize="0.75rem">
        {moment(createdAt).format("ddd DD.MM.YYYY")}
      </Text>
    </Box>
  );
};

const DateIcon = styled(MdDateRange)`
  min-width: 18px;
  min-height: 20px;
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

export default DateLabel;
