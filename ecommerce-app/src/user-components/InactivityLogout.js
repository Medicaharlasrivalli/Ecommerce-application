import  { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';

const InactivityLogout = ({ timeout = 30*60*1000 }) => {
const navigate=useNavigate();
  const dispatch = useDispatch();
  const timerRef = useRef(null);
  const isAuthenticated=useSelector(state=>state.user.isAuthenticated);
  console.log("inactivity");

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(logoutUser, timeout);
  };

  const logoutUser = () => {
    dispatch(logOut());
    navigate('/login');
  };

  useEffect(() => {
    if(isAuthenticated){
        const events = ['mousemove', 'mousedown', 'keypress', 'touchstart'];
    const eventHandler = () => resetTimer();

    events.forEach(event => window.addEventListener(event, eventHandler));
    return () => {
      events.forEach(event => window.removeEventListener(event, eventHandler));
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }
    }, [isAuthenticated]);

  return <Outlet/>;
};

export default InactivityLogout;
