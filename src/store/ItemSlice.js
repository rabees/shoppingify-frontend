import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem(state, action) {
      const isAlready = state.some(
        (element) => element._id == action.payload._id
      );
      if (isAlready)
        return state.map((item) =>
          item._id == action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      return state.concat({ ...action.payload, quantity: 1 });
    },
    addQuantity(state, action) {
      return state.map((item) =>
        item._id == action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decreaseQuantity(state, action) {
      return state.map((item) =>
        item._id == action.payload && item.quantity != 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
    deleteItem(state, action) {
      return state.filter((item) => item._id != action.payload);
    },
    emptyCart(state, action) {
      return state.filter(() => false);
    },
    addListToCart(state, action) {
      return action.payload;
    },
  },
});

export const {
  addItem,
  addQuantity,
  decreaseQuantity,
  deleteItem,
  emptyCart,
  addListToCart,
} = itemsSlice.actions;
export default itemsSlice.reducer;
