import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleOpenCart } from "../actions/cartActions";

const CartBtn = () => {
  const dispatch = useDispatch();
  const { cart, isLoading, error } = useSelector((state) => state.shoppingCart);
  return (
    <div>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <button onClick={() => dispatch(handleOpenCart())}>
          Cart {cart.total_items}
        </button>
      )}
    </div>
  );
};

export default CartBtn;
