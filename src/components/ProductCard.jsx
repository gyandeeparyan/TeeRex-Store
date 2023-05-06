import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_cart_item } from "../Redux/cartActions";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((store) => store.cartSlice);

  return (
    <>
      <div className='product_card'>
        <img src={`${item.imageURL}`} alt=' PRODUCT IMAGES' />
        <div className='item_details'>
          <p className='product_title'>{item.name}</p>
          <div className='price-btn'>
            <p>
              {item.currency} {item.price}
            </p>
            <button
              className='btn'
              onClick={() => {
                // checking for duplicate item in the cart
                let itemIndex = cartData.findIndex((e) => e.id == item.id);
                console.log(itemIndex);
                if (itemIndex != -1) {
                  alert("Already in the cart !!");
                  return;
                }
                // if there is no duplicate item then add it to cart
                dispatch(add_cart_item(item));
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
