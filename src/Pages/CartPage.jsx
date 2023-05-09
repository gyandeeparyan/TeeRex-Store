import React, { useEffect, useState } from "react";
import "../Styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  decrease_item_quantity,
  delete_cart_item,
  
  increase_item_quantity,
} from "../Redux/cartActions";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmptyCart from "../components/EmptyCart";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const CartPage = () => {
  const { cartData } = useSelector((store) => store.cartSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalPrice = 0;

  console.log("current item in cart ", cartData);

  return (
    <>
       <Navbar />
      <div className='cart_main'>
     
        <div className='cart_content'>
          {cartData.length ? (
            cartData.map((e, i) => {
              {
                totalPrice = totalPrice + e.price * e.currentQuantity;
              }
              return (
                <div className='cart_content_main' id={e.id}>
                  <img
                    src='https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png'
                    alt=''
                  />
                  <div className='price_and_title_box'>
                    <p>{e.name}</p>
                    <p>
                      {e.currency}
                      {e.price * e.currentQuantity}
                    </p>
                  </div>
                  <div className='button_box'>
                    <div className='increase_decrease_box'>
                      <button
                        onClick={() => {
                          // checking quantity limit
                          let itemIndex = cartData.findIndex(
                            (e) => e.currentQuantity > (e.quantity-1)
                          );
                          if (itemIndex != -1) {
                            alert("Item quantity limit is exceeded ");
                            return;
                          }
                          dispatch(increase_item_quantity(e.id));
                        }}
                      >
                        <AddCircleIcon/>
                      </button>
                      <div style={{ marginTop: "6px" }}>
                        <h3>{e.currentQuantity}</h3>
                      </div>
                      <button
                        onClick={() => {
                          dispatch(decrease_item_quantity(e.id));
                        }}
                      >
                        <RemoveCircleIcon/>
                      </button>
                    </div>
                    <div className='remove'>
                      <button
                        onClick={() => {
                          console.log("clicked item id", e.id, e);
                          dispatch(delete_cart_item(e.id));
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              onClick={() => {
                navigate("/");
              }}
              className='empty-cart'
            >
              
              <EmptyCart />
            </div>
          )}
        </div>
        <div className='cart-details'>
          <p>YOUR CART SUMMARY</p>
          <p>PAYABLE AMOUNT : INR {totalPrice === 0 ? "" : totalPrice}</p>
          <button className='btn'>Checkout</button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
