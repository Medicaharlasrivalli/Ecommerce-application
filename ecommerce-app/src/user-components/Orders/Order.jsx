import React, { useEffect, useState } from 'react'
import './Orders.css'
import { useNavigate } from 'react-router-dom';
function Order({order}) {
    const [total,setTotal]=useState(0);
    const navigate=useNavigate();
    useEffect(() => {
        let newTotal = 0;
        if (order.item) {
            newTotal = order.item.reduce((acc, ite) => {
                return acc + (ite.price * ite.quantity);
            }, 0);
        }
        setTotal(newTotal);
    }, [order.item]);
    const handleClick=(id)=>{
        navigate('/product/'+id);
    }
    return (
            <div className="order">
                    <div className="order-header">
                        <h3>Order ID:{order.id}</h3>
                        <p><strong>Shipping Address:  </strong>{order.address} </p>
                        <p><strong>Order Placed On:  </strong>{order.orderDate} </p>
                    </div>
                    <div className="order-items">
                        {order.item.map((item1)=>{return <div className="item">
                            <img src={`data:image/jpeg;base64,${item1.images.data}`} onClick={()=>handleClick(item1.id)} alt="Product" />
                            <p>{item1.name}</p>
                            <p><strong>Quantity:</strong> {item1.quantity}</p>
                            <p>${item1.quantity*item1.price}</p>
                        </div>})}
                    </div>   
                 <p><strong>Total:  </strong>${total} </p>
            </div>
    )
}

export default Order
