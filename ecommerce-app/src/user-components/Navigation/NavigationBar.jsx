import React, { useRef } from 'react'
import { AiOutlineSearch, AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import './NavigationBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logOut } from '../../store/userSlice';
function NavigationBar() {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    console.log(isAuthenticated);
    const handleClick=()=>{
        dispatch(logOut());
    }
    const keyword=useRef();
    const handleSearch=()=>{
        navigate('/products/'+keyword.current.value);
        keyword.current.value=null;
    }
    return (
        <nav className="navigation-bar">
            <div className="nav-left">
                {/* Logo */}
                <h2>FASHION WORLD</h2>
                {/* Category links */}
                <div className="nav-links">
                    <Link to={`/products/`}>ALL</Link>
                    <Link to={`/products/${"men"}`}>MEN</Link>
                    <Link to={`/products/${'women'}`}>WOMEN</Link>
                    <Link to={`/products/${"kids"}`}>KIDS</Link>
                </div>
            </div>

            <div className="nav-right">
                {/* Search bar */}
                <div className="search-bar">
                    <AiOutlineSearch className="search-icon" />
                    <input
                        ref={keyword}
                        onKeyDown={(e)=>{if(e.key==="Enter")handleSearch();}}
                        type="text"
                        placeholder="Search..."
                        className="search-input"
                    ></input>
                </div>

                {/* User icons */}
                <div class="user-icons">
                    <Link to="/orders"><AiOutlineUser /></Link>
                    <Link to={`/wishlist`}><AiOutlineHeart /></Link>
                    <Link to={`/cart`} class="cart-icon-container">
                        <AiOutlineShoppingCart />
                        {/* {cartCount > 0 && <span class="cart-counter">{cartCount}</span>} */}
                    </Link>
                    <Link onClick={handleClick}>Logout</Link>
                </div>

            </div>
        </nav>
    )
}

export default NavigationBar
