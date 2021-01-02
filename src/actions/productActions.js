import { commerce } from "../lib/commerce";

export const fetchProductsActions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "FETCH_PRODUCTS_START" });
    const products = await commerce.products.list();
    console.log(products);
    dispatch({
      type: "FETCH_PRODUCTS_SUCCESS",
      payload: products,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "FETCH_PRODUCTS_ERROR",
      payload: error,
    });
  }
};
