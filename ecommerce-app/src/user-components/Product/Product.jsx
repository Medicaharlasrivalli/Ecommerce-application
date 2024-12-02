import React, { useEffect, useState } from 'react'
import NavigationBar from '../Navigation/NavigationBar'
import { useDispatch } from 'react-redux'
import './Product.css'
import { getProducts } from '../../store/productSlice';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Product() {
    const dispatch=useDispatch();
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    useEffect( ()=>{
        const callProducts=async()=>{
            const action=await dispatch(getProducts());
            console.log(action);
            setData(action.payload);
        }
        callProducts();
    },[dispatch])
    const showProduct=(id)=>{
     navigate('/product/'+id);
    }
    return (
        <>
            <NavigationBar/>
            {data.length===0?<LoadingSpinner/>:<div className="product-grid" >
                {data.map((product, index) => {
                        return (
                            <div class="product-item" key={index} onClick={()=>{console.log(product);showProduct(product.id)}}>
                                <img src={`data:image/jpeg;base64,${product.images[0].data}`} alt="Product 1" />
                                <h3>{product.name}</h3>
                                {/* <p>{product.description}</p> */}
                                <span class="product-price">${product.price}</span>
                            </div>
                        )
                    })}
            </div>}
        </>
    )
}

export default Product
