import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from '../Styles/styles.css'
import { CartIcon } from "../Styles/icons";
const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartData } = useSelector((store) => store.cartSlice);




  return <>
   <nav>
        <div className='nav-center'>
          
          <h3 style={{cursor:'pointer'}} onClick={()=>navigate('/')}>Home</h3>
          <div style={{cursor:'pointer'}} onClick={()=>navigate('/cart')} className='nav-container'>
           
            <CartIcon />
            <div className='amount-container'>
              <p className='total-amount'> {cartData.length ? cartData.length : ""}</p>
            </div>
          </div>
        </div>
      </nav>
  </>;
};

export default Navbar;
