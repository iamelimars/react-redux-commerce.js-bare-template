import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import authReducer from "./authReducer";

const initialState = {
  counter: 0,
};

const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: action.payload };
    case "DECREMENT":
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  count: countReducer,
  allProducts: productsReducer,
  shoppingCart: cartReducer,
  checkoutData: checkoutReducer,
  auth: authReducer,
});

export default rootReducer;
