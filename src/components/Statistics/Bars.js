import React from "react";
import styled from "styled-components";

const Bars = ({ data, color, title }) => {
  return (
    <Container>
      <Title>Top {title}</Title>
      {data?.map((item, index) => (
        <Item key={index}>
          <TextContainer>
            <Text>{item.name}</Text> <Text>{item.percentage}%</Text>
          </TextContainer>
          <Tube>
            <Line color={color} width={item.percentage + "%"} />
          </Tube>
        </Item>
      ))}
    </Container>
  );
};

const Title = styled.p`
  font-weight: 500;
  font-size: var(--font-size-lg);
  margin-bottom: 25px;
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const Tube = styled.div`
  background-color: #e0e0e0;
  width: 100%;
  height: 6px;
  border-radius: 4px;
`;
const Container = styled.div`
  padding-inline: 32px;
`;
const Item = styled.div`
  margin-bottom: 29px;
`;
const Text = styled.p``;
const Line = styled.div`
  background-color: ${(props) => props.color};
  height: 100%;
  width: ${(props) => props.width};
  border-radius: 4px;
`;
export default Bars;
