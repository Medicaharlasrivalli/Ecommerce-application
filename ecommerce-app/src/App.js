
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Welcome from './user-components/Welcome/Welcome';
import SignUp from './user-components/login/SignUp';
import Product from './user-components/Product/Product';
import ViewProduct from './user-components/viewProduct/ViewProduct';
import Cart from './user-components/Cart/Cart';
import ProtectedRoute from './user-components/ProtectedRoute';
import Category from './user-components/Category/Category';
import Wishlist from './user-components/Wishlist/Wishlist';
import OPTValidation from './user-components/OPTValidation/OPTValidation';
import Login from './user-components/login/Login.jsx';
import InactivityLogout from './user-components/InactivityLogout.js';
import CheckOut from './user-components/CheckOut/CheckOut.jsx';
import Orders from './user-components/Orders/Orders.jsx';
import ForgetPassword from './user-components/ForgetPassword/ForgetPassword.jsx';
import UpdatePassword from './user-components/UpdatePassword/UpdatePassword.jsx';

function App() {
  return (
    <BrowserRouter>
      <InactivityLogout/>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path="/OPTValidation" element={<OPTValidation/>}></Route>
        <Route path='/forgetPassword' element={<ForgetPassword/>}></Route>
        <Route path='/reset-password/:token' element={<UpdatePassword/>}></Route>
        <Route element={<ProtectedRoute/>}>
            <Route path='/' element={<Welcome />}></Route>
            <Route path='/products' element={<Product />}></Route>
            <Route path='/product/:id' element={<ViewProduct />}></Route>
            <Route path='/cart' element={<Cart />} ></Route>
            <Route path='/wishlist' element={<Wishlist/>}></Route>
            <Route path="/products/:keyword" element={<Category/>}></Route>
            <Route path="/checkout" element={<CheckOut/>}></Route>
            <Route path='/orders' element={<Orders/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
