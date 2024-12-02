import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('/products/all', async () => {
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    console.log(token);
    try{
        const response = await axios.get("http://localhost:8085/products",{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data;
    }catch(error){
        throw error;
    }
});
export const getProductDetails=createAsyncThunk('/products/details',async(id)=>{
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    try{
        const response=await axios.get("http://localhost:8085/products/"+id,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data;
    }catch(error){
        throw error;
    }
})
export const searchProduct=createAsyncThunk('/product/search',async(data)=>{
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    try{
        const {keyword}=data;
        const response=await axios.get("http://localhost:8084/products/search?keyword="+keyword,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data;
    }catch(error){
        throw error;
    }
})
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null,
        error: null,
        productDetails:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading';
                // state.products=null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getProductDetails.pending, (state) => {
                state.status = 'loading';
                // state.productDetails=null;
                console.log("helloo");
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productDetails=action.payload;
                console.log(action.payload);
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(searchProduct.pending, (state) => {
                state.status = 'loading';
                // state.products=null;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products=action.payload;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });;
    }
});

export default productSlice.reducer;
