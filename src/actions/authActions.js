import { commerce } from "../lib/commerce";

export const handleLoginCustomer = (email, url) => async (dispatch) => {
  dispatch({ type: "LOGIN_EMAIL_START" });
  try {
    const status = await commerce.customer.login(email, url);
    dispatch({ type: "LOGIN_EMAIL_SENT" });
    return status;
  } catch (error) {
    dispatch({ type: "LOGIN_EMAIL_ERROR", payload: error });
    console.log("Error sending email", error);
  }
};

export const handleGetOrders = () => async (dispatch, getState) => {
  await dispatch(handleSetCustomer());
  dispatch({ type: "GET_ORDERS_START" });
  try {
    const orders = await commerce.customer.getOrders();
    dispatch({ type: "GET_ORDERS_SUCCESS", payload: orders.data });
  } catch (error) {
    dispatch({ type: "GET_ORDERS_ERROR", payload: error });
  }
};

export const handleGetToken = (token) => async (dispatch) => {
  dispatch({ type: "LOGIN_EMAIL_START" });
  try {
    const fetchedToken = await commerce.customer.getToken(token);
    console.log(fetchedToken);

    dispatch({ type: "GET_TOKEN_SUCCESS" });
    dispatch(handleSetCustomer());
    return;
  } catch (error) {
    dispatch({ type: "GET_TOKEN_ERROR", payload: error });
    return;
  }
};

export const handleSetCustomer = () => async (dispatch) => {
  dispatch({ type: "SET_CUSTOMER_START" });
  const isLoggedIn = await commerce.customer.isLoggedIn();
  if (!isLoggedIn || isLoggedIn === false) {
    return Promise.resolve(null);
  }
  try {
    const customer = await commerce.customer.about();
    dispatch({ type: "SET_CUSTOMER_SUCCESS", payload: customer.data });
  } catch (error) {
    dispatch({ type: "SET_CUSTOMER_ERROR", payload: error });
    dispatch(handleLogoutCustomer());
  }
};

export const handleLogoutCustomer = () => async (dispatch) => {
  dispatch({ type: "LOGOUT_START" });
  try {
    await commerce.customer.logout();
    dispatch({ type: "LOGOUT_START" });
  } catch (error) {
    dispatch({ type: "LOGOUT_ERROR" });
  }
};
