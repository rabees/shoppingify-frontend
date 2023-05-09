import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import CategoriesList from "./CategoriesList";
import ItemSchema from "./../../../schemas/Item";
import { Formik, Form, Field } from "formik";
import { useAddNewItem } from "../../../hooks/useItem";
import { useNavigate } from "react-router-dom";
import ItemServices from "../../../services/ItemServices";

const ItemForm = () => {
  const { isLoading, error, data } = useQuery(["categories"], () =>
    ItemServices.getCategories()
  );
  const navigate = useNavigate();
  const { mutate } = useAddNewItem();
  const [selected, setSelected] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        note: "",
        img: "",
        category: "",
      }}
      enableReinitialize={true}
      validationSchema={ItemSchema}
      onSubmit={(values, actions) => {
        mutate({ ...values, category: selected });
        actions.resetForm({
          values: {
            name: "",
            note: "",
            img: "",
            category: " ",
          },
        });
        setSelected(null);
      }}
    >
      {({ errors }) => (
        <StyledForm>
          <Label htmlFor="name" textAlign="left" margin="18px 0px 9px 0px">
            Name {errors.name && <>{errors.name}</>}
            <StyledField id="name" name="name" placeholder="Enter a name" />
          </Label>
          <Label htmlFor="note" textAlign="left" margin="18px 0px 9px 0px">
            Note (optional) {errors.note && <>{errors.note}</>}
            <StyledField
              id="note"
              name="note"
              placeholder="Enter a note"
              height="100px"
            />
          </Label>
          <Label htmlFor="img" textAlign="left" margin="18px 0px 9px 0px">
            Image (optional) {errors.img && <>{errors.img}</>}
            <StyledField id="img" name="img" placeholder="Enter a URL" />
          </Label>
          <Label htmlFor="category" margin="18px 0px 9px 0px">
            Category{errors.category && <>{errors.category}</>}
            <StyledField
              id="category"
              placeholder="Enter a category"
              onClick={() => setShowCategories(true)}
              onBlur={() =>
                setTimeout(() => {
                  setShowCategories(false);
                }, 100)
              }
              readOnly
              value={selected || ""}
              name="category"
              className="categories"
            ></StyledField>
            {!isLoading && showCategories && (
              <CategoriesList
                showCategories={showCategories}
                toggleCategories={toggleCategories}
                categories={data.data}
                setSelected={setSelected}
              />
            )}
          </Label>
          <Box>
            <Button
              onClick={() => navigate(-1)}
              backgroundColor="inherit"
              color="#34333A"
            >
              Cancel
            </Button>
            <Button type="submit" backgroundColor="#F9A109" color="white">
              Save
            </Button>
          </Box>
        </StyledForm>
      )}
    </Formik>
  );
};

export const StyledField = styled(Field)`
  border: 2px solid #bdbdbd;
  border-radius: 12px;
  width: 100%;
  padding-left: 17px;
  margin-top: 10px;
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

const StyledForm = styled(Form)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-right: 45px;
  margin-top: auto;
  margin-bottom: 34px;
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
  width: 100%;
  &:focus-within {
    color: var(--color-primary) !important;
  }
`;

const Button = styled.button`
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border-radius: 12px;
  padding: 20px 25px;
  border: none;
  font-size: var(--font-size-md);
  line-height: 18px;
  width: 87px;
`;

export default ItemForm;
