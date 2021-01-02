import React from "react";
import { useDispatch } from "react-redux";
import { handleEmptyCart } from "../actions/cartActions";

const EmptyCartBtn = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(handleEmptyCart())}>Empty cart</button>
  );
};

export default EmptyCartBtn;
