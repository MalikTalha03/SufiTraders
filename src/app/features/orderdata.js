import { createSlice } from "@reduxjs/toolkit";

export const orderdataSlice = createSlice({
  name: "orderdata",
  initialState: {
    orderdata: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setOrderdata: (state, action) => {
      const existingProductIndex = state.orderdata.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.orderdata[existingProductIndex].quantity =
          action.payload.quantity;
      } else {
        state.orderdata = [...state.orderdata, action.payload];
      }
    },
  },
});

export const { setOrderdata, updateOrderdata } = orderdataSlice.actions;
export default orderdataSlice.reducer;
