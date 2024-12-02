import React from 'react'
import './OPTValidation.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, verifyUser, setUsers} from '../../store/userSlice';

function OPTValidation() {
    const EXPIRATION_TIME = 60000; 
    let timeoutId;
    const navigate=useNavigate();
    const [successMessage,setSuccessMessage]=useState(null);
    const user=JSON.parse(localStorage.getItem("initialUser"));
    const [optValue,setOptValue]=useState();
    const opt=useSelector(state=>state.user.opt);
    localStorage.setItem("OPT",JSON.stringify(opt));
    const opt1=localStorage.getItem("OPT");
    const mailTime1=useSelector(state=>state.user.mailTime);
    localStorage.setItem("mailTime",mailTime1);
    const dispatch=useDispatch();
    const [message,setMessage]=useState(null);
    console.log(localStorage);
    const isExpired = () => {
        console.log(localStorage);
        const mailTime = localStorage.getItem('mailTime');
        console.log(!mailTime);
        if (!mailTime) return true;
    
        const currentTime = new Date().getTime();
        return currentTime - mailTime >= EXPIRATION_TIME;
    };
    const handelResend=()=>{
        setMessage(null);
        dispatch(setUsers({user}));
        dispatch(verifyUser({user}));
    }
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);
    const ValidateOPT=()=>{
        console.log("OPT"+typeof(opt));
        console.log("OPT Value"+typeof(optValue));
        console.log(opt1==optValue);
        if(!isExpired()){
            if(opt1==optValue){
                dispatch(addUser(user))
                setMessage(null);
                setSuccessMessage("User Registered Successfully...")
                setTimeout(()=>{
                    navigate("/login")
                },2000)
            }
            else
                setMessage("OPT Not valid, Please re-check");
        }
        else    
            setMessage("Verification session expired... Resend email");
    }
    return (
        <div className='otp-box'>
        <div className="otp-container">
        <div className="otp-form">
            <h2>Verify your Email</h2>
            <p>Enter OPT sent to {user.email}</p>
            {successMessage && <p style={{color:'green',fontSize:'15px',textAlign:'center'}}>{successMessage}</p>}
            <div id="otpForm">
                <div className="input-group">
                    <label for="otp">Enter OTP</label>
                    <input type="text" id="otp" name="otp" required onChange={(e)=>setOptValue(e.target.value)}/>
                </div>
                <button type="submit" onClick={ValidateOPT}>Validate OTP</button>
                <p><Link onClick={handelResend} className="resend-link">Resend OTP</Link></p>
                {message && <p style={{color:'red',fontSize:'15px',textAlign:'center'}}>{message}</p>}
            </div>
        </div>
        </div>
        </div>
    )
}

export default OPTValidation
