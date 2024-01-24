import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./features/products";
import { orderdataSlice } from "./features/orderdata";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    orderdata: orderdataSlice.reducer,
  },
});
