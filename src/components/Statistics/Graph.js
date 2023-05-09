import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import styled from "styled-components";
import { months } from "../../utilities/months";

const Graph = ({ data }) => {
  const monthsData = data?.map((element) => ({
    name: months[element._id.month],
    quantity: element.total,
  }));
  return (
    <GraphContainer>
      <Title>Yearly Summary</Title>
      <ResponsiveContainer width="97%" height="100%">
        <LineChart
          style={{ position: "absolute" }}
          width={600}
          height={300}
          data={monthsData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Line type="natural" dataKey="quantity" stroke="orange" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </GraphContainer>
  );
};

const GraphContainer = styled.section`
  grid-area: graph;
  width: 100%;
  height: 250px;
  @media only screen and (min-width: 800px) {
    height: 300px;
  }
  /* padding-inline: 2rem; */
`;

const Title = styled.p`
  font-weight: 500;
  font-size: var(--font-size-lg);
  margin-bottom: 2rem;
  margin-left: 2rem;
`;
export default Graph;
