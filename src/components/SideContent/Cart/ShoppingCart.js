import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Source } from "./../../../assets/source.svg";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EmptyCart } from "./../../../assets/emptyCart.svg";
import { MdMode } from "react-icons/md";
import { useCreateShopList } from "../../../hooks/useShopList";
import { emptyCart } from "../../../store/ItemSlice";
import { AnimatePresence, motion } from "framer-motion";

const ShoppingCart = ({ showSide }) => {
  const items = useSelector((state) => state.items);
  const [categories, setCategories] = useState([]);
  const [editableMode, setEditableMode] = useState(false);
  const [shopListName, setShopListName] = useState("");
  const { mutate } = useCreateShopList();
  const navigate = useNavigate();

  useEffect(() => {
    if (items) {
      setCategories([...new Set(items.map((element) => element.category))]);
    }
  }, [items]);

  const dispatch = useDispatch();
  const createShopList = (items, shopListName) => {
    mutate({ items, createdAt: new Date(), name: shopListName });
    dispatch(emptyCart());
    setShopListName("");
  };

  return (
    <ShoppingCartStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0, transition: { type: "tween", duration: 0.2 } }}
      show={showSide + ""}
    >
      <Wrapper>
        <Content>
          <Figure>
            <Section>
              <Source className="wineIcon" />
              <TitleContainer>
                <Text
                  fontWeight="700"
                  color="white"
                  fontSize="var(--font-size-md)"
                >
                  Didn't find <br />
                  what you need?
                </Text>
                <Button onClick={() => navigate("add")}>Add Item</Button>
              </TitleContainer>
            </Section>
          </Figure>
          <Box>
            <Text
              fontWeight="700"
              color="#34333a"
              fontSize="24px"
              margin="30px 0px"
            >
              Shopping list
            </Text>
            <MdMode
              style={{ cursor: "pointer" }}
              onClick={() => setEditableMode(!editableMode)}
            />
          </Box>
          <AnimatePresence>
            {categories?.map((category, index) => (
              <div key={index}>
                <Text
                  color="#828282"
                  fontSize="14px"
                  margin="30px 0px 10px 0px"
                >
                  {category}
                </Text>
                {items
                  ?.filter((item) => item.category == category)
                  .map((item) => (
                    <Item
                      editableMode={editableMode}
                      key={item._id}
                      dispatch={dispatch}
                      {...item}
                    />
                  ))}
              </div>
            ))}
          </AnimatePresence>

          {items.length == 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{
                opacity: 0,
                transition: { type: "tween", duration: 0.2 },
              }}
            >
              <Text fontWeight="700" fontSize="20px">
                No items
              </Text>
              <EmptyCart />
            </motion.div>
          )}
        </Content>
      </Wrapper>
      <Options>
        <Label htmlFor="name" textAlign="left" margin="18px 0px 9px 0px">
          <StyledField
            id="name"
            name="name"
            placeholder="Enter a name"
            onChange={(e) => setShopListName(e.target.value)}
            value={shopListName}
          />
          <CompleteButton
            onClick={() => createShopList(items, shopListName)}
            backgroundColor={"#F9A109"}
            color="white"
          >
            Complete
          </CompleteButton>
        </Label>
      </Options>
    </ShoppingCartStyled>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-lg);
`;

const StyledField = styled.input`
  border: 2px solid #bdbdbd;
  border-radius: 12px;
  width: 100%;
  padding-left: 17px;
  position: relative;
  height: ${(props) => (props.height ? props.height : "61.25px")};
  background-color: inherit;
  &::placeholder {
    color: #bdbdbd;
  }
  &:focus {
    outline: none !important;
    border: 2px solid var(--color-primary);
  }
`;
const Label = styled.label`
  position: relative;
  display: inline-block;
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "var(--font-size-md)"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  width: 309.89px;
  height: 61.25px;
  &:focus-within {
    color: var(--color-primary) !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  width: 100%;
  height: 85%;
`;
const Options = styled.div`
  width: 100%;
  height: 15%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const Content = styled.section`
  height: 100%;
  width: clamp(250px, 233.4px + 4.1vw, 308px);
  position: relative;
`;
const Text = styled.p`
  color: ${(props) => (props.color ? props.color : "black")};
  text-align: ${(props) => (props.textAlign ? props.textAlign : "left")};
  font-size: ${(props) =>
    props.fontSize ? props.fontSize : "var(--font-size-md)"};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "500")};
  margin: ${(props) => (props.margin ? props.margin : "0px")}; ; ;
`;
const CompleteButton = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100%;
  cursor: pointer;
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  color: ${(props) => (props.backgroundColor ? props.color : "#34333a")};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 20px 23px;
  border: none;
  font-size: var(--font-size-sm);
  line-height: 18px;
  font-weight: 700;
`;
const Button = styled.button`
  cursor: pointer;
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  color: ${(props) => (props.backgroundColor ? props.color : "#34333a")};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 20px 23px;
  border: none;
  font-size: var(--font-size-sm);
  line-height: 18px;
  font-weight: 700;
`;

const TitleContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  width: 300px;
`;
const Figure = styled.figure`
  background: #80485b;
  height: 120px;
  width: 100%;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 13px;
  margin: 35px 0px;
`;
const ShoppingCartStyled = styled(motion.aside)`
  height: 100%;
  width: calc(100% - 52px);
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fff0de;
  position: fixed;
  left: ${(props) => (props.show == "true" ? "52px" : "-100%")};
  transition: left 0.4s ease;
  @media only screen and (min-width: 800px) {
    width: 389px;
    right: 0px;
    left: auto;
    grid-area: side;
    position: fixed;
  }

  .wineIcon {
    position: absolute;
    left: -0px;
    top: -29px;
    height: 120px;
  }
`;

export default ShoppingCart;
