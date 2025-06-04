import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialProducts } from "../../data/fakeProducts";

export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
}

interface ProductsState {
  items: Product[];
  filter: {
    categories: string[];
    inStockOnly: boolean;
  };
}

const initialState: ProductsState = {
  items: initialProducts,
  filter: {
    categories: [],
    inStockOnly: false,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload);
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    deleteProducts(state, action: PayloadAction<string[]>) {
      state.items = state.items.filter((p) => !action.payload.includes(p.id));
    },
    setCategoryFilter(state, action: PayloadAction<string[]>) {
      state.filter.categories = action.payload;
    },
    setInStockOnly(state, action: PayloadAction<boolean>) {
      state.filter.inStockOnly = action.payload;
    },
  },
});

export const {
  addProduct,
  editProduct,
  deleteProducts,
  setCategoryFilter,
  setInStockOnly,
} = productsSlice.actions;

export default productsSlice.reducer;
