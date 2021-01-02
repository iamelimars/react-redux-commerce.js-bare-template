const initialState = {
  cart: {},
  isCartOpen: false,
  isLoading: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REFRESH_CART_START":
    case "EMPTY_CART_START":
    case "REMOVE_FROM_CART_START":
    case "UPDATE_CART_QTY_START":
    case "ADD_TO_CART_START":
    case "FETCH_CART_START":
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case "REFRESH_CART_SUCCESS":
    case "EMPTY_CART_SUCCESS":
    case "REMOVE_FROM_CART_SUCCESS":
    case "UPDATE_CART_QTY_SUCCESS":
    case "ADD_TO_CART_SUCCESS":
    case "FETCH_CART_SUCCESS":
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
      };
    case "REFRESH_CART_ERROR":
    case "EMPTY_CART_ERROR":
    case "REMOVE_FROM_CART_ERROR":
    case "UPDATE_CART_QTY_ERROR":
    case "ADD_TO_CART_ERROR":
    case "FETCH_CART_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "OPEN_CART":
      return {
        ...state,
        isCartOpen: true,
      };
    case "CLOSE_CART":
      return {
        ...state,
        isCartOpen: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
