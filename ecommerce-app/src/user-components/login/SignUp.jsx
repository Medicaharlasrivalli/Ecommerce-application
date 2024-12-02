import React, { useState} from 'react'
import {useDispatch} from "react-redux";
import { useNavigate,Link } from 'react-router-dom';
import { setUsers, verifyUser } from '../../store/userSlice';
function SignUp() {
    const [message,setMessage]=useState(null);
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [user,setUser]=useState({
      firstName:null,
      lastName:null,
      email:null,
      password:null
    })
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(user);
        dispatch(setUsers({user}));
        const action=await dispatch(verifyUser({user}));
        console.log(action);
        if(action.payload==="User already registered"){
          setMessage("User already registered..Please Login")
        }
        else if(action.payload==="fail"){
          setMessage("Give a valid mail");
        }
        else{
          navigate('/OPTValidation',{user});
        }
    }
    const handleChanges=(sym,e)=>{
        setUser((prevUser)=>{
          return {...prevUser,[sym]:e.target.value}
        })
    }
    return (
        <div class="container">
        <header>
          <h1>FASHION </h1><br></br>
          <h2>WORLD</h2>
    
        </header>
          <form class="login-box">
              <h2>SIGNUP</h2>
              <input className="lg-text" type="text"  placeholder="First Name*"  onChange={(e)=>{handleChanges("firstName",e)}}/><br></br>
              <input className="lg-text" type="text"  placeholder="Last Name*"  onChange={(e)=>{handleChanges("lastName",e)}}/><br></br>
             
              <input type="email"   placeholder="Email Address*" required  onChange={(e)=>{handleChanges("email",e)}}/><br></br>
              <input type="password"   placeholder="Password*" required  onChange={(e)=>{handleChanges("password",e)}}/><br></br>
             
              <button className="lg-button" type="submit" onClick={(e)=>handleSubmit(e)}>Signup
              </button>
              {message && <p style={{color:'red',fontSize:'15px',textAlign:'center'}}>{message}</p>}
             <span><p style={{fontSize:'12px',textAlign:'center'}}><Link to="/login">Have Account? Login User</Link></p></span> 
          </form>
         
          </div>
    )
}

export default SignUp
