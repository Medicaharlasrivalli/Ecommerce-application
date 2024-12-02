import React, { useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../../store/userSlice';
function Login() {
    const [credentials,setCredentials]=useState();
    const [message,setMessage]=useState(null);
    const isAuthenticated=useSelector(state=>state.user.isAuthenticated);
    console.log(isAuthenticated);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log(localStorage);
    const handleChanges=(sym,e)=>{
        setCredentials((prevCredentials)=>{
            return {...prevCredentials,[sym]:e.target.value}
        })
    }
    const handleSubmit=async ()=>{
        const action=await dispatch(getUser(credentials));
        console.log(action.payload);
        if(action.payload==='Failed')
            setMessage("Username or password incorrect");
        else
            navigate("/")
    }
    return (
     <div className="container">
        <header>
            <h1>FASHION </h1><br></br>
            <h2>WORLD</h2>
        </header>
        <div className="login-box">
            <h2>LOGIN</h2>
            {/* {!signinSuccess && <p style={{ color: 'red' }}>{signinMsg}</p>} */}
            <input className="lg-text" type="text" placeholder="Username or Email Address*" required onChange={(e)=>handleChanges("email",e)}/><br></br>
            <input type="password" placeholder="Password*" required onChange={(e)=>handleChanges("password",e)}/><br></br>

            <Link to="/forgetPassword">Forget password?</Link><br></br>
            <input type="checkbox"></input>
            <label>Remember Me</label><br></br>

            <button className="lg-button" type="submit" onClick={handleSubmit}>Login</button>
            {message && <p style={{color:'red',fontSize:'15px',textAlign:'center'}}>{message}</p>}
            <Link to="/Signup" >No Account? Register</Link>

        </div>
    </div>
    )
}

export default Login
