import React, { useState } from 'react'
import './UpdatePassword.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../store/userSlice';
function UpdatePassword() {
    const {token}=useParams();
    console.log(token);
    const [newPassword,setNewPassword]=useState();
    const [confirmPassword,setConfirmPassword]=useState();
    const [message,setMessage]=useState(null);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleSubmit=async()=>{
        console.log("Hello");
        console.log(newPassword===confirmPassword);
        if(newPassword===confirmPassword)
        {
            console.log(true);
            const data={token,newPassword}
            const action=await dispatch(updatePassword(data));
            console.log(action)
            if(action.payload==="success")
            {
                setMessage("Password changed successfully.....")
                setTimeout(()=>{
                    navigate('/login');
                },2000);
            }
        }
    }
    return (
        <div className='body-update'>
            <div className="new-password-container">
    <header className="brand-header">
        <h1>FASHION<span>WORLD</span></h1>
    </header>
    <div className="new-password-box">
        <h2>CREATE NEW PASSWORD</h2>
        <div className='form-update'>
            <label htmlFor="new-password">New Password</label>
            <input type="password" id="new-password" name="new-password" placeholder="Enter New Password*" required onChange={(e)=>setNewPassword(e.target.value)}/>

            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm New Password*" required onChange={(e)=>setConfirmPassword(e.target.value)}/>

            <button type="submit" onClick={handleSubmit}>Reset Password</button>
        </div>
        <div className="back-to-login">
            <Link to="/login">Back to Login</Link>
        </div>
    </div>
</div>
        </div>

    )
}

export default UpdatePassword
