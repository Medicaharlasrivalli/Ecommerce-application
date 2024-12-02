import React,{useState} from 'react'
import './CheckOut.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addOrder } from '../../store/ordersSlice';
import NavigationBar from '../Navigation/NavigationBar';
function CheckOut() {
    const location=useLocation();
    const dispatch=useDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const [message,setMessage]=useState(null);
    const [amount,setAmount]=useState(0);
    const [fullAddress,setFullAddress]=useState({
        address:null,
        city:null,
        state:null,
        zip:null
    })
    const navigate=useNavigate();
    const login=JSON.parse(localStorage.getItem("loginUser"));
    let {total}=location.state;
    total=total.toFixed(2);
    console.log(location);
    const handleChanges=(sym,value)=>{
        setFullAddress((prevAddress)=>{
            return {...prevAddress,[sym]:value}
        })
    }
    const handlePlaceOrder=()=>{
        if(total==amount){
        const address=fullAddress.address+","+fullAddress.city+","+fullAddress.state+","+fullAddress.zip;
        const data={id:login.cartID,ordersID:login.ordersID,address:address}
        dispatch(addOrder(data));
        setShowDialog(true);
        setTimeout(() => {
            navigate('/orders');
        }, 2000);
    } else {
        setMessage("Enter a valid amount");
    }
    }
    return (
        <>
        <NavigationBar/>
        <div className={`body ${showDialog ? 'blur' : ''}`}>
            <div class="checkout-body">
                <div class="checkout-container">
                    <div class="checkout-form">
                    <h2>CHECKOUT</h2>
                    <div class="form-left">
                        <label for="address">Shipping Address*</label>
                        <input type="text" id="address" name="address" required onChange={(e)=>handleChanges("address",e.target.value)}/>

                        <label for="city">City*</label>
                        <input type="text" id="city" name="city" required onChange={(e)=>handleChanges("city",e.target.value)}/>

                        <label for="state">State*</label>
                        <input type="text" id="state" name="state" required onChange={(e)=>handleChanges("state",e.target.value)}/>

                        <label for="zip">Zip Code*</label>
                        <input type="text" id="zip" name="zip" required onChange={(e)=>handleChanges("zip",e.target.value)}/>
                    </div>
                    <div class="form-right">
                        <div class="amount-section">
                            <label for="total-amount">Total Amount</label>
                            <span id="total-amount">${total}</span>
                        </div>
                        <div class="amount-section">
                            <label for="enter-amount">Enter Amount</label>
                            <input type="text" id="enter-amount" name="enter-amount" required onChange={(e)=>setAmount(e.target.value)}/>
                        </div>
                        <button type="submit" onClick={handlePlaceOrder}>Place Order</button>
                        {message && <p style={{color:'red',fontSize:'15px',textAlign:'center'}}>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {showDialog && (
                <div className="dialog-box">
                    <h3>Payment Successful!!😇</h3>
                    <h4>Proceeding to your Orders....</h4>
                </div>
            )}
    </>
    )
}

export default CheckOut
