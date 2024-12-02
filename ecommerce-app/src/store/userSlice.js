import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const EXPIRATION_TIME = 1800000; 

const isExpired = () => {
    
    const loginTime = localStorage.getItem('loginTime');
    console.log(loginTime);
    if (!loginTime) return true;

    const currentTime = new Date().getTime();
    return currentTime - loginTime >= EXPIRATION_TIME;
};

export const addUser = createAsyncThunk('/user/add', async (newUser) => {
    const response = await axios.post("http://localhost:8085/users/register", newUser);
    return response.data;
});

export const getUser = createAsyncThunk('/user/get', async (credentials) => {
    const response = await axios.post("http://localhost:8085/users/login", credentials);
    return response.data;
});
export const verifyUser=createAsyncThunk("/user/verify",async(data)=>{
    const {user}=data;
    console.log(user);
    const response=await axios.post("http://localhost:8085/users/verify",user);
    return response.data;
})
export const resetPassword=createAsyncThunk("/password/restReq",async(email)=>{
    console.log(email);
    const data={"email":email}
    const response=await axios.post("http://localhost:8085/password/reset-request",data);
    return response.data;
})
export const updatePassword=createAsyncThunk('/password/restPass',async(data)=>{
    const {token,newPassword}=data;
    const updateData={"token":token,"newPassword":newPassword}
    const response=await axios.post("http://localhost:8085/password/reset-password",updateData);
    return response.data;
})
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        opt:null,
        jwtToken:null,
        loginUser:isExpired() ? null : JSON.parse(localStorage.getItem('loginUser')),
        status: null,
        error: null,
        mailTime:null,
        isAuthenticated:isExpired()? false :JSON.parse(localStorage.getItem("isAuthenticated"))
    },
    reducers: {
        logOut:(state,action)=>{
            state.status = null;
            state.isAuthenticated = false;
            state.loginUser = null;
            localStorage.clear();
            console.log(localStorage);
        },
        setUsers:(state,action)=>{
            state.loginUser=action.payload.user;
            const currentTime=new Date().getTime();
            state.mailTime=currentTime
            localStorage.setItem("initialUser",JSON.stringify(state.loginUser));
            localStorage.setItem("mailTime",currentTime);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
                localStorage.removeItem("OPT");
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuthenticated=true;
                state.loginUser = action.payload.user;
                state.jwtToken=action.payload.token;
                localStorage.setItem("jwtToken",JSON.stringify(action.payload.token));
                const currentTime = new Date().getTime();
                localStorage.setItem('loginTime', currentTime);
                localStorage.setItem('loginUser', JSON.stringify(action.payload.user));
                localStorage.setItem('isAuthenticated', true);
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(verifyUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.opt=action.payload;
                localStorage.setItem('OPT', JSON.stringify(action.payload));
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});
export const {logOut,setUsers}=userSlice.actions;
export default userSlice.reducer;
