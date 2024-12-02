import React, { useState } from 'react'
import './ForgetPassword.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../store/userSlice';
function ForgetPassword() {
    const [mail,setMail]=useState();
    const [message,setMessage]=useState(null);
    const [errorMessage,setErrorMessage]=useState(null);
    const dispatch=useDispatch();
    const handleSubmit=async ()=>{
        const action=await dispatch(resetPassword(mail));
        if(action.payload==="success"){
            setMessage("Reset Link sent to your mail");
            setErrorMessage(null)
        }
        else if(action.payload==="User not found"){
            setErrorMessage("User not found");
            setMessage(null);
        }
        else{
            setErrorMessage("Error occured....");
            setMessage(null);
        }
    }
    return (
        <>
        <header>
                <h1>FASHION </h1><br></br>
                <h2>WORLD</h2>
            </header>
        <div className='forget-body'>
        <div className="forget-password-container">
            <div className="forget-password-box">
                <h2>FORGOT PASSWORD</h2>
                <div className='form'>
                    <label for="email">Enter Your Email Address</label>
                    <input type="text" id="email" name="email" placeholder="Email Address*" required  onChange={(e)=>setMail(e.target.value)}/>
                    <button type="submit" onClick={handleSubmit}>Reset Password</button>
                </div>
                <div className="back-to-login">
                    <Link to="/login">Back to Login</Link>
                </div>
                {message && <p style={{color:'green',fontSize:'15px',textAlign:'center'}}>{message}</p>}
                {errorMessage && <p style={{color:'red',fontSize:'15px',textAlign:'center'}}>{errorMessage}</p>}
            </div>
        </div>
        </div>
        </>
    )
}

export default ForgetPassword
