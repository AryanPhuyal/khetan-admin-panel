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
  let changedProduct;
  if (!newProduct) {
    return state;
  }

  if (action.type === SUSPEND_PRODUCT) {
    changedProduct = { ...newProduct, status: 3 };
  } else {
    changedProduct = { ...newProduct, status: 2 };
    // newProduct.status = 1;
  }

  return updateObject(state, { products: [...newProducts, changedProduct] });
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
