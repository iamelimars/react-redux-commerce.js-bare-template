import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { handleCloseCart } from "../actions/cartActions";
import CartItem from "./CartItem";
import EmptyCartBtn from "./EmptyCartBtn";

const Cart = () => {
  const { cart, isLoading, isCartOpen, error } = useSelector(
    (state) => state.shoppingCart
  );
  const dispatch = useDispatch();

  return (
    <div>
      {isCartOpen && (
        <>
          <h1>Your Shopping Cart</h1>
          <button onClick={() => dispatch(handleCloseCart())}>
            Close Cart
          </button>
          {cart.total_unique_items === 0 && (
            <p>You have no items in your shopping cart, start adding some!</p>
          )}
          {cart.total_unique_items > 0 && (
            <>
              {cart.line_items.map((lineItem) => (
                <CartItem item={lineItem} key={lineItem.id} />
              ))}
              <EmptyCartBtn />
              <div>
                <p>Subtotal:</p>
                <p>{cart.subtotal.formatted_with_symbol}</p>
              </div>
              <Link to="/checkout">Checkout</Link>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
