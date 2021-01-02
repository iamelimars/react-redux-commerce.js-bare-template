import { commerce } from "../lib/commerce";
import { handleRefreshCart } from "./cartActions";

export const handleCaptureCheckout = (newOrder) => async (
  dispatch,
  getState
) => {
  let { checkoutData } = await getState();
  const checkoutTokenId = checkoutData.checkoutToken.id;
  dispatch({ type: "CAPTURE_CHECKOUT_START" });
  try {
    const order = await commerce.checkout.capture(checkoutTokenId, newOrder);
    dispatch({
      type: "CAPTURE_CHECKOUT_SUCCESS",
      payload: order,
    });
    dispatch(handleRefreshCart());

    window.sessionStorage.setItem("order_receipt", JSON.stringify(order));

    return {
      success: true,
    };
  } catch (error) {
    console.log("There was an error confirming your order", error);
    dispatch({
      type: "CAPTURE_CHECKOUT_ERROR",
      payload: error,
    });
    return {
      success: false,
    };
  }
};

export const handleGenerateCheckoutToken = () => async (dispatch, getState) => {
  let { shoppingCart } = await getState();
  shoppingCart = shoppingCart.cart;
  if (!shoppingCart.id) {
    shoppingCart = await commerce.cart.retrieve();
  }

  dispatch({ type: "GENERATE_CHECKOUT_TOKEN_START" });
  if (shoppingCart.line_items.length) {
    try {
      const token = await commerce.checkout.generateToken(shoppingCart.id, {
        type: "cart",
      });
      dispatch({
        type: "GENERATE_CHECKOUT_TOKEN_SUCCESS",
        payload: token,
      });
      dispatch(handleFetchShippingCountries());
    } catch (error) {
      console.log(error);
      dispatch({
        type: "GENERATE_CHECKOUT_TOKEN_ERROR",
        payload: error,
      });
    }
  } else {
    dispatch({
      type: "GENERATE_CHECKOUT_TOKEN_ERROR",
      payload: "There are no products in your cart.",
    });
  }
};

export const handleFetchShippingCountries = () => async (
  dispatch,
  getState
) => {
  dispatch({ type: "FETCH_SHIPPING_COUNTRIES_START" });
  const { checkoutData } = getState();
  const checkoutTokenId = checkoutData.checkoutToken.id;
  if (checkoutData.checkoutToken.id) {
    try {
      const shippingCountries = await commerce.services.localeListShippingCountries(
        checkoutTokenId
      );

      dispatch({
        type: "FETCH_SHIPPING_COUNTRIES_SUCCESS",
        payload: shippingCountries.countries,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_SHIPPING_COUNTRIES_ERROR",
        payload: "There was an error while fetching the shipping countries",
      });
    }
  }
};

export const handleFetchSubdivisions = (countryCode) => async (
  dispatch,
  getState
) => {
  dispatch({ type: "FETCH_SUBDIVISIONS_START" });
  try {
    const subdivisions = await commerce.services.localeListSubdivisions(
      countryCode
    );
    dispatch({
      type: "FETCH_SUBDIVISIONS_SUCCESS",
      payload: subdivisions.subdivisions,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_SUBDIVISIONS_ERROR",
      payload: "There was an error while fetching the subdivisions",
    });
  }
};
export const handleFetchShippingOptions = (stateProvince = null) => async (
  dispatch,
  getState
) => {
  const { checkoutData } = await getState();
  const checkoutTokenId = checkoutData.checkoutToken.id;
  const { shippingCountry } = checkoutData;

  dispatch({ type: "FETCH_SHIPPING_OPTIONS_START" });
  try {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      {
        country: shippingCountry,
        region: stateProvince,
      }
    );
    dispatch({
      type: "FETCH_SHIPPING_OPTIONS_SUCCESS",
      payload: options,
    });
  } catch (error) {
    dispatch({
      type: "FETCH_SHIPPING_OPTIONS_ERROR",
      payload: "There was an error while fetching the shipping options",
    });
  }
};

export const handleSetShippingOption = (shippingOption) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "SET_SHIPPING_OPTION",
    payload: shippingOption,
  });
};
export const handleSetShippingCountry = (shippingCountry) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "SET_SHIPPING_COUNTRY",
    payload: shippingCountry,
  });
};
export const handleSetShippingSubdivision = (shippingSubdivision) => (
  dispatch,
  getState
) => {
  dispatch({
    type: "SET_SHIPPING_SUBDIVISION",
    payload: shippingSubdivision,
  });
};
