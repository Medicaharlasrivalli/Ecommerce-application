import React, { useEffect, useState } from 'react'
import NavigationBar from '../Navigation/NavigationBar'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, getCart, manageQuantity } from '../../store/cartSlice';
import './Cart.css'
import { useNavigate } from 'react-router-dom';

function Cart() {
    const data=useSelector(state=>state.cart.cart);
    console.log(data);
    const navigate=useNavigate();
    const login=JSON.parse(localStorage.getItem("loginUser"));
    const cartID=login.cartID;
    const [total,setTotal]=useState(0);
    const dispatch=useDispatch();
    const handleClick=(id)=>{
        navigate('/product/'+id);
    }
    const handleMinus=(cartID,id,symbol)=>{
        const data={cartID:cartID,id:id,symbol:symbol}
        dispatch(manageQuantity(data));
    }
    const handlePlus=(cartID,id,symbol)=>{
        const data={cartID:cartID,id:id,symbol:symbol}
        dispatch(manageQuantity(data));
    }
    const handleRemove=(cartID,id)=>{
        const data={cartID:cartID,id:id}
        dispatch(deleteItem(data))
    }
    useEffect(()=>{
        console.log(cartID)
        dispatch(getCart(cartID));
        
    },[dispatch,cartID]);
    useEffect(() => {
        let newTotal = 0;
        if (data.items) {
            newTotal = data.items.reduce((acc, item) => {
                return acc + (item.price * item.quantity);
            }, 0);
        }
        setTotal(newTotal);
    }, [data.items]);
    const handleClickProceedtoCheckout=()=>{
        navigate('/checkout',{state:{total}});
    }
    return (
        <>
                <NavigationBar/>
                {data.items && data.items.length>0 ? (<div className='cart_block'>
                    <h3>Shopping Cart</h3>
                    <div className='cart'>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map(cart => {
                                    return (
                                        <tr>
                                            <td><img onClick={() => handleClick(cart.id)} src={`data:image/jpeg;base64,${cart.images.data}`} alt="Product" /></td>
                                            <td onClick={() => handleClick(cart.id)}>{cart.name}</td>
                                            <td >{cart.product_price}</td>
                                            <td>
                                                <div className="quantity-control">
                                                    <button onClick={() => handleMinus(cartID,cart.id,"-")}>-</button>
                                                    <span>{cart.quantity}</span>
                                                    <button onClick={() => handlePlus(cartID,cart.id,"+")}>+</button>
                                                </div>
                                            </td>
                                            <td>${(cart.price * cart.quantity).toFixed(2)}</td>
                                            <td><button onClick={() => handleRemove(cartID,cart.id)}>Remove</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="checkout-section">
                        <h5>Total: $<span id="subtotal">{total.toFixed(2)}</span></h5>
                        <button className="rm-button" onClick={handleClickProceedtoCheckout}>Proceed to Checkout</button>
                    </div>
                </div>):(
                <div className='empty-cart'>
                    <img src="https://static.vecteezy.com/system/resources/previews/016/462/240/non_2x/empty-shopping-cart-illustration-concept-on-white-background-vector.jpg" alt="Empty Cart" />
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                </div>
            )}
    
        </>
    )
}

export default Cart
