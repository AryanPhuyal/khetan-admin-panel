import {
  APPROVE_PRODUCT,
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_START,
  FETCH_PRODUCT_SUCCESS,
  SUSPEND_PRODUCT,
} from "../actions/product";
import { updateObject } from "./helper";

const init = {
  loading: false,
  error: null,
  listProduct: false,
  products: [],
};

const approveProduct = (state, action) => {
  const newProducts = [...state.products];
  const newProduct = newProducts.find((e) => e._id === action.payload);
  if (action.type === SUSPEND_PRODUCT) {
    alert("Here");
    newProduct.status = 2;
  } else {
    newProduct.status = 3;
  }
  return updateObject(state, { products: newProducts });
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_START:
      return updateObject(state, { loading: true, listProduct: true });
    case FETCH_PRODUCT_FAIL:
      return updateObject(state, { loading: false, error: action.payload });
    case FETCH_PRODUCT_SUCCESS:
      return updateObject(state, { loading: false, products: action.payload });
    case APPROVE_PRODUCT:
      return approveProduct(state, action);
    case SUSPEND_PRODUCT:
      return approveProduct(state, action);

    default:
      return state;
  }
};
export default reducer;
