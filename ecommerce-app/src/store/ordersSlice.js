import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const addOrder=createAsyncThunk('/add/order',async (data)=>{
    const {id,ordersID,address}=data
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    const response=await axios.post("http://localhost:8085/cart/placeOrder/"+id,{ordersID,address},{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return response.data;
})
export const getOrders=createAsyncThunk('/get/orders',async(id)=>{
    const token=JSON.parse(localStorage.getItem("jwtToken"));
    const response=await axios.get("http://localhost:8085/orders/getOrders/"+id,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    return response.data;
})
const orderSlice=createSlice({
    name:"orders",
    initialState:{
        orders:null,
        state:null,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(addOrder.pending,(state)=>{
                state.state="loading"
            })
            .addCase(addOrder.fulfilled,(state,action)=>{
                state.orders=action.payload;
                console.log(action.payload);
                state.status="fullfilled"
            })
            .addCase(addOrder.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getOrders.pending,(state)=>{
                state.state="loading"
            })
            .addCase(getOrders.fulfilled,(state,action)=>{
                state.orders=action.payload;
                console.log(action.payload);
                state.status="fullfilled"
            })
            .addCase(getOrders.rejected,(state,action)=>{
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export default orderSlice.reducer;