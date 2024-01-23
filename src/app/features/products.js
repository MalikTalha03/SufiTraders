import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + "products");
    const data = await response.json();
    return data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: {},
    status: "idle",
    error: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      const product = action.payload;
      const data = {
        id: product._id,
        category: product.category,
        name: product.name,
        price: 0,
        quantity: 0,
        saleprice: product.price,
        supplierID: product.supplierID,
      };
      state.selectedProduct = data;
    },
    updateSelectedProduct: (state, action) => {
      const { name, value } = action.payload;
      state.selectedProduct = {
        ...state.selectedProduct,
        [name]: value,
      };
    },
    
    setProduct: (state, action) => {
      const product = action.payload;
      const existingQuantity = state.selectedProduct?.quantity || 0;
      state.selectedProduct = {
        id: product.id,
        category: product.category,
        name: product.name,
        price: product.price,
        quantity: existingQuantity,
        supplierID: product.supplierID,
      };
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
export const { setSelectedProduct, updateSelectedProduct, setProduct } =
  productsSlice.actions;
