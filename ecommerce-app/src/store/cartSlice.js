import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addCart=createAsyncThunk('/cart',async(data)=>{
    const {id,product}=data;
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    console.log(product);
    try{
        const response=await axios.post("http://localhost:8081/cart/addToCart/"+id,product,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data;
    }catch(error){
        throw error;
    }
})
export const getCart=createAsyncThunk('/cart/get',async(id)=>{
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    try{
        
        const response=await axios.get("http://localhost:8085/cart/getCart/"+id,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data;
    }catch(error){
        throw error;
    }
})
export const manageQuantity=createAsyncThunk('/cart/quan',async(data)=>{
    const {cartID,id,symbol}=data;
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    try{
        const response=await axios.post("http://localhost:8085/cart/updateQuantity/"+cartID,{id,symbol},{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data;
    }catch(error){
        throw error;
    }
})
export const deleteItem=createAsyncThunk('/cart/remove',async(data)=>{
    const {cartID,id}=data;
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    try{
        const response=await axios.delete("http://localhost:8085/cart/deleteCart/"+cartID+"?id="+id,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        return response.data
    }catch(error){
        throw error;
    }
})
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        error:null,
        status:null,
        cart:[]
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(addCart.pending,(state,action)=>{
                state.status="Loading"
            })
            .addCase(addCart.fulfilled,(state,action)=>{
                state.status="Fullfilled";
                console.log(action.payload);
                state.cart=action.payload
            })
            .addCase(addCart.rejected,(state,action)=>{
                state.status="Error";
                state.error=action.error.message
            })
            .addCase(getCart.pending,(state,action)=>{
                state.status="Loading"
            })
            .addCase(getCart.fulfilled,(state,action)=>{
                state.status="Fullfilled";
                state.cart=action.payload
            })
            .addCase(getCart.rejected,(state,action)=>{
                state.status="Error";
                state.error=action.error.message
            })
            .addCase(manageQuantity.pending,(state,action)=>{
                state.status="Loading"
            })
            .addCase(manageQuantity.fulfilled,(state,action)=>{
                state.status="Fullfilled";
                state.cart=action.payload
            })
            .addCase(manageQuantity.rejected,(state,action)=>{
                state.status="Error";
                state.error=action.error.message
            })
            .addCase(deleteItem.pending,(state,action)=>{
                state.status="Loading"
            })
            .addCase(deleteItem.fulfilled,(state,action)=>{
                state.status="Fullfilled";
                state.cart=action.payload
            })
            .addCase(deleteItem.rejected,(state,action)=>{
                state.status="Error";
                state.error=action.error.message
            })
    }
})

export default cartSlice.reducer;