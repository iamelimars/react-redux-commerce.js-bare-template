import { commerce } from "../lib/commerce";

export const handleOpenCart = () => async (dispatch, getState) => {
  dispatch({ type: "OPEN_CART" });
};
export const handleCloseCart = () => async (dispatch, getState) => {
  dispatch({ type: "CLOSE_CART" });
};

export const handleRefreshCart = () => async (dispatch, getState) => {
  dispatch({ type: "REFRESH_CART_START" });
  try {
    const newCart = await commerce.cart.refresh();
    dispatch({
      type: "REFRESH_CART_SUCCESS",
      payload: newCart,
    });
  } catch (error) {
    dispatch({
      type: "REFRESH_CART_ERROR",
      payload: error,
    });
  }
};

export const handleEmptyCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "EMPTY_CART_START" });
    const newCart = await commerce.cart.empty();
    dispatch({
      type: "EMPTY_CART_SUCCESS",
      payload: newCart.cart,
    });
  } catch (error) {
    dispatch({
      type: "EMPTY_CART_ERROR",
      payload: error,
    });
  }
};
export const handleRemoveFromCart = (lineItemId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "REMOVE_FROM_CART_START" });
    const newCart = await commerce.cart.remove(lineItemId);

    dispatch({
      type: "REMOVE_FROM_CART_SUCCESS",
      payload: newCart.cart,
    });
  } catch (error) {
    dispatch({
      type: "REMOVE_FROM_CART_ERROR",
      payload: error,
    });
  }
};
export const handleUpdateCartQty = (lineItemId, quantity) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "UPDATE_CART_QTY_START" });
    const newCart = await commerce.cart.update(lineItemId, { quantity });
    dispatch({
      type: "UPDATE_CART_QTY_SUCCESS",
      payload: newCart.cart,
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_CART_QTY_ERROR",
      payload: error,
    });
  }
};
export const handleAddToCart = (productId, quantity) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: "ADD_TO_CART_START" });
    const newCart = await commerce.cart.add(productId, quantity);

    dispatch({
      type: "ADD_TO_CART_SUCCESS",
      payload: newCart.cart,
    });
  } catch (error) {
    dispatch({
      type: "ADD_TO_CART_ERROR",
      payload: error,
    });
  }
};
export const handleFetchCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_CART_START" });
    const newCart = await commerce.cart.retrieve();
    dispatch({
      type: "FETCH_CART_SUCCESS",
      payload: newCart,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_CART_ERROR",
      payload: error,
    });
  }
};
