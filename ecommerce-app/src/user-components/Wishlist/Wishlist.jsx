import React, { useEffect } from 'react'
import NavigationBar from '../Navigation/NavigationBar'
import { useDispatch, useSelector } from 'react-redux'
import { getWishList, removeWishList } from '../../store/wishListSlice';
import { useNavigate } from 'react-router-dom';

function Wishlist() {
    const data=useSelector((state)=>{ return state.wishlist.wishlist});
    const login=JSON.parse(localStorage.getItem("loginUser"));
    const wishListID=login.wishListID;
    console.log(wishListID);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getWishList(wishListID));
    },[dispatch,wishListID])
    const handleClick=(productID)=>{
        navigate('/product/'+productID);
    }
    const handleRemove=(productID)=>{
        const data={id:wishListID,productID:productID}
        dispatch(removeWishList(data));
    }
    return (
        <>
                <NavigationBar />
                {data && data.length>0? (<div className='cart_block'>
                    <h3>Wish List</h3>
                    <div className='cart'>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(wishlist => {
                                    return (
                                        <tr >
                                            <td><img onClick={() => handleClick(wishlist.id)} src={`data:image/jpeg;base64,${wishlist.images[0].data}`} alt="Product" /></td>
                                            <td onClick={() => handleClick(wishlist.id)}>{wishlist.name}</td>
                                            <td>{wishlist.price}</td>
                                            <td ><button onClick={() => handleRemove(wishlist.id)}>Remove</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>):<div className='empty-cart'>
                    <img src="https://png.pngtree.com/png-clipart/20230919/original/pngtree-comicstyle-wishlist-icon-on-white-background-with-splash-effect-vector-png-image_12432709.png" alt="Empty Cart" />
                    <h3>Your wishlist is empty</h3>
                    <p>Looks like you haven't added anything to your wishlist yet.</p>
                </div>}
        </>
    )
}

export default Wishlist
