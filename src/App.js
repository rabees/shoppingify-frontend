import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import History from "./pages/History";
import Statistics from "./pages/Statistics";
import Shoppingify from "./pages/Shoppingify";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import { useState } from "react";
import ShopList from "./components/History/ShopList";
import { AnimatePresence } from "framer-motion";
function App() {
  const [showSide, setShowSide] = useState(false);
  const location = useLocation();
  const locationArr = location.pathname?.split("/") ?? [];
  return (
    <Container className="App">
      <Navbar setShowSide={setShowSide} showSide={showSide} />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={locationArr[0]}>
          <Route
            path="/home/*"
            element={
              <Shoppingify showSide={showSide} setShowSide={setShowSide} />
            }
          />
          <Route path="/history/*" element={<History showSide={showSide} />} />
          <Route
            path="/history/shopList/:id/*"
            element={<ShopList showSide={showSide} />}
          />
          <Route
            path="/statistics/*"
            element={<Statistics showSide={showSide} />}
          />
        </Routes>
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.main`
  max-width: 100vw;
  min-height: 100vh;
  height: auto;
  display: grid;
  grid-template-columns: 42px auto;
  grid-template-rows: 100vh 100%;
  background-color: ghostwhite;
  grid-template-areas:
    "nav content"
    "nav content";
  @media only screen and (min-width: 800px) {
    grid-template-columns: 82px auto 389px;
    grid-template-areas:
      "nav content side"
      "nav content side";
  }
`;

export default App;
