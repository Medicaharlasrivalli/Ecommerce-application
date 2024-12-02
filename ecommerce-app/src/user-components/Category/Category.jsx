import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../../store/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../Navigation/NavigationBar';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';


function Category() {
    const keyword=useParams();
    const navigate=useNavigate();
    const status=useSelector(state=>state.products.status);
    const data=useSelector(state=>state.products.products);
    console.log(data);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(searchProduct(keyword));
    },[dispatch,keyword])
    const showProduct=(id)=>{
        navigate('/product/'+id);
    }
    return (
        <>
        <NavigationBar/>
        {status==="loading" && <LoadingSpinner/>}
        {(status==="fullfilled"&&data.length===0)?<p>Not Available</p>:<div className="product-grid" >
            {data.map((product, index) => {
                    return (
                        <div class="product-item" key={index} onClick={()=>{showProduct(product.id)}}>
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

export default Category
