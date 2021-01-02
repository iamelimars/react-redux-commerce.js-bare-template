const initialState = {
  checkoutToken: null,
  shippingCountries: {},
  shippingCountry: "",
  shippingSubdivisions: {},
  shippingSubdivision: "",
  shippingOptions: [],
  shippingOption: "",
  isLoading: false,
  error: null,
  order: null,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SHIPPING_SUBDIVISION":
      return {
        ...state,
        shippingSubdivision: action.payload,
      };
    case "SET_SHIPPING_COUNTRY":
      return {
        ...state,
        shippingCountry: action.payload,
      };
    case "SET_SHIPPING_OPTION":
      return {
        ...state,
        shippingOption: action.payload,
      };
    case "CAPTURE_CHECKOUT_START":
    case "FETCH_SHIPPING_OPTIONS_START":
    case "FETCH_SUBDIVISIONS_START":
    case "FETCH_SHIPPING_COUNTRIES_START":
    case "GENERATE_CHECKOUT_TOKEN_START":
      return {
        ...state,
        isLoading: true,
      };
    case "CAPTURE_CHECKOUT_SUCCESS":
      return {
        ...state,
        order: action.payload,
      };
    case "FETCH_SHIPPING_OPTIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        shippingOptions: action.payload,
      };
    case "FETCH_SUBDIVISIONS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        shippingSubdivisions: action.payload,
      };
    case "FETCH_SHIPPING_COUNTRIES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        shippingCountries: action.payload,
      };
    case "GENERATE_CHECKOUT_TOKEN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        checkoutToken: action.payload,
      };
    case "CAPTURE_CHECKOUT_ERROR":
    case "FETCH_SHIPPING_OPTIONS_ERROR":
    case "FETCH_SUBDIVISIONS_ERROR":
    case "FETCH_SHIPPING_COUNTRIES_ERROR":
    case "GENERATE_CHECKOUT_TOKEN_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default checkoutReducer;
