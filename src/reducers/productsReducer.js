const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_START":
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case "FETCH_PRODUCTS_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
