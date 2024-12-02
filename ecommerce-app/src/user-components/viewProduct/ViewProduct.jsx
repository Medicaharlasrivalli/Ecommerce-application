import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetails } from '../../store/productSlice';
import { FaHeart } from 'react-icons/fa';
import NavigationBar from '../Navigation/NavigationBar';
import './ViewProduct.css'
import { addCart } from '../../store/cartSlice';
import { addWishList, getWishList, removeWishList } from '../../store/wishListSlice';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function ViewProduct() {
    const {id}=useParams();
    const login=JSON.parse(localStorage.getItem("loginUser"));
    const user=login.cartID;
    const wishlist=useSelector((state)=>state.wishlist.wishlist);
    console.log(wishlist);
    // console.log(login);
    const [isWishlisted,setIsWishListed]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [index,setIndex]=useState(0);
    const [quantity,setQuantity]=useState(1);
    let product=useSelector(state=>state.products.productDetails);
    let status=useSelector(state=>state.products.status);
    // console.log(product);
    useEffect(() => {
        dispatch(getProductDetails(id));
        dispatch(getWishList(login.wishListID));
    }, [dispatch, id,login.wishListID]);
    useEffect(()=>{
        console.log(wishlist);
        if(wishlist!==null){
            const items=wishlist.filter(item=>item.id===product.id);
            console.log(items)
            if(items.length!==0)
                setIsWishListed(true);
            else
                setIsWishListed(false);
        }
    },[wishlist])
    const handleNext=()=>{
        if(product.images.length-1===index)
            setIndex(0);
        else
            setIndex(index=>index+1);
    }
    const handlePrev=()=>{
        if(index===0)
            setIndex(product.images.length-1);
        else
            setIndex(index=>index-1);
    }
    const handleWishList=()=>{
        const data={id:login.wishListID,productID:product.id};
        if(isWishlisted===true){
            dispatch(removeWishList(data));
            setIsWishListed(false);
        }
        else{
        setIsWishListed(true);
        dispatch(addWishList(data));
        }
    }
    const addToCart=async ()=>{
        const productData={id:product.id,name:product.name,description:product.description,price:product.price,quantity:quantity,images:product.images[0]}
        const data={id:user,product:productData}
        const action=await dispatch(addCart(data));
        if(typeof action.payload==="object")
            navigate("/cart");
    }
    return (
        <>
                <NavigationBar />
                {status==="loading" && <LoadingSpinner/>}
                {product && status!=="loading" && (<div class="product-view">
                    <div class="product-image">
                        <img src={`data:image/jpeg;base64,${product.images[index].data}`} alt="Product" />
                        <button onClick={handlePrev} class="previous">&lt;</button>
                        <button onClick={handleNext} class="next">&gt;</button>
                    </div>

                    <div class="product-details">
                        <h3 class="product-name">{product.name}</h3>
                        <p>{product.description}</p>
                        <p>This is a description of the product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rhoncus dui sit amet rutrum euismod. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue.</p>
                        <br></br>
                        <span class="price">${product.price}</span>
                        <span>
                            <p>Quantity</p>
                            <div className="quantity-control">
                                <button className='left' onClick={() => { if (quantity > 0) return setQuantity(quantity => quantity - 1) }}>-</button>
                                <span>{quantity}</span>
                                <button className='right' onClick={() => { setQuantity(quantity => quantity + 1) }}>+</button>
                            </div>
                        </span>
                        <div class="details">
                            <h4>Details</h4>
                            <ul>
                                <li>Detail 1</li>
                                <li>Detail 2</li>
                                <li>Detail 3</li>
                            </ul>
                        </div>
                        <br></br>
                        <div className='buttons'>
                            <button class="add-to-cart" onClick={()=>addToCart()}>Add to Cart</button>
                            <button className="wishlist-button" onClick={handleWishList}>
                                {isWishlisted ? <FaHeart className="heart active" /> : <FaHeart className="heart" />}
                                Wishlist
                            </button>
                        </div>

                    </div>
                </div>)}
        </>
    )
}

export default ViewProduct
