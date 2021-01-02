const initialState = {
  customer: {},
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TOKEN_START":
    case "LOGOUT_START":
    case "LOGIN_EMAIL_START":
    case "SET_CUSTOMER_START":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_EMAIL_SENT":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_TOKEN_SUCCESS":
      return state;
    case "SET_CUSTOMER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        customer: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        customer: {},
      };
    case "LOGOUT_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        customer: {},
      };
    case "GET_TOKEN_ERROR":
    case "SET_CUSTOMER_ERROR":
    case "LOGIN_EMAIL_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
