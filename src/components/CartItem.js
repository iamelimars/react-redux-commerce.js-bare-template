import React from "react";
import styled from "styled-components";
import {
  handleUpdateCartQty,
  handleRemoveFromCart,
} from "../actions/cartActions";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Container className="cart-item">
      <img
        className="cart-item__image"
        src={item.media.source}
        alt={item.name}
        width="100px"
      />
      <div className="cart-item__details">
        <h4 className="cart-item__details-name">{item.name}</h4>
        <div className="cart-item__details-qty">
          <button
            onClick={() =>
              dispatch(handleUpdateCartQty(item.id, item.quantity - 1))
            }
            type="button"
            title="Reduce quantity"
          >
            -
          </button>
          <p>{item.quantity}</p>
          <button
            onClick={() =>
              dispatch(handleUpdateCartQty(item.id, item.quantity + 1))
            }
            type="button"
            title="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="cart-item__details-price">
          {item.line_total.formatted_with_symbol}
        </div>
      </div>
      <button
        type="button"
        onClick={() => dispatch(handleRemoveFromCart(item.id))}
      >
        Remove
      </button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default CartItem;
