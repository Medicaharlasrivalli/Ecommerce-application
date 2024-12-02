import React, { useEffect } from 'react'
import NavigationBar from '../Navigation/NavigationBar'
import './Orders.css'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../store/ordersSlice';
import Order from './Order';
import { useNavigate } from 'react-router-dom';
function Orders() {
    const ord=useSelector(state=>state.orders.orders);
    const navigate=useNavigate();
    let orders=null;
    const login=JSON.parse(localStorage.getItem("loginUser"));
    const id=login.ordersID;
    const dispatch=useDispatch();
    const handleShopping=()=>{
        navigate('/products/');
    }
    if(ord){
        orders=ord.items;
    }
    useEffect(()=>{
        dispatch(getOrders(id));
    },[id,dispatch])
    return (
        <>
        <NavigationBar/>
        {orders && orders.length>0 ? (<div className='orders-body'>
            <main>
                <h2>Your Orders</h2>
                {orders.map(order=><Order order={order}/>)}
            </main>
        </div>):(
                <div className='empty-cart'>
                    <img src="https://rsrc.easyeat.ai/mweb/no-orders2.webp" alt="Empty Cart" />
                    <p>Looks like you haven't ordered anything yet.</p>
                    <button className="ordersButton" onClick={handleShopping}>Start Shopping</button>
                </div>
            )}
        </>
    )
}

export default Orders
