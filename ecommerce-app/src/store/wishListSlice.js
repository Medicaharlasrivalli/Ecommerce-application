import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const addWishList=createAsyncThunk('/wishlist/add',async(data)=>{
    const {productID,id}=data;
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    console.log(productID);
    try{
        const response=await axios.post("http://localhost:8085/wishlist/"+id+"?productID="+productID,null,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        console.log(response);
        return response.data;
    }catch(error){
        throw error;
    }
})
export const getWishList=createAsyncThunk('/wishlist/get',async(id)=>{
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    try{
        const response=await axios.get("http://localhost:8085/wishlist/"+id,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        // console.log(response.data);
        return response.data;
    }catch(error){
        throw error;
    }
})
export const removeWishList=createAsyncThunk('/wishlist/remove',async(data)=>{
    const {productID,id}=data;
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    try{
        const response=await axios.delete("http://localhost:8085/wishlist/"+id+"?productID="+productID,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data;
    }catch(error){
        throw error;
    }
})
const wishListSlice=createSlice({
    name:"wishlist",
    initialState:{
        wishlist:null,
        status:null,
        error:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getWishList.pending,(state,action)=>{
            state.status="Loading";
        })
        .addCase(getWishList.fulfilled,(state,action)=>{
            state.status="fullfilled";
            // console.log(action);
            state.wishlist=action.payload;
        })
        .addCase(getWishList.rejected,(state,action)=>{
            state.status="failed";
        })
        .addCase(addWishList.pending,(state,action)=>{
            state.status="Loading";
        })
        .addCase(addWishList.fulfilled,(state,action)=>{
            state.status="fullfilled";
            // console.log(action);
            state.wishlist=action.payload;
        })
        .addCase(addWishList.rejected,(state,action)=>{
            state.status="failed";
        })
        .addCase(removeWishList.pending,(state,action)=>{
            state.status="Loading";
        })
        .addCase(removeWishList.fulfilled,(state,action)=>{
            state.status="fullfilled";
            // console.log(action);
            state.wishlist=action.payload;
        })
        .addCase(removeWishList.rejected,(state,action)=>{
            state.status="failed";
        });
    }
})
export default wishListSlice.reducer;