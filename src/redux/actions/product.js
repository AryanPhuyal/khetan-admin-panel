import { productListUrl } from "../../utility/api";
import { authGet } from "../../utility/request";

export const FETCH_PRODUCT_START = "FETCH_PRODUCT_START";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";
export const FETCH_PRODUCT_FAIL = "FETCH_PRODUCT_FAIL";

export const SUSPEND_PRODUCT = "SUSPEND_PRODUCT";
export const APPROVE_PRODUCT = "APPROVE_PRODUCT";

const fetchProductStart = () => {
  return {
    type: FETCH_PRODUCT_START,
  };
};
const fetchProductFail = (err) => {
  return {
    type: FETCH_PRODUCT_FAIL,
    payload: err,
  };
};
const fetchProductSuccess = (data) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: data,
  };
};

export const fetchProdut = (token) => async (dispatch) => {
  dispatch(fetchProductStart());
  try {
    const response = await authGet(productListUrl, token);
    if (response.data.success) {
      dispatch(fetchProductSuccess(response.data.data));
    } else {
      dispatch(fetchProductFail(response.data.message));
    }
  } catch (err) {
    dispatch(fetchProductFail(err.toString()));
  }
};

export const approveProduct = (productId, type) => {
  return {
    type: type === 1 ? APPROVE_PRODUCT : SUSPEND_PRODUCT,
    payload: productId,
  };
};

export const productDetails = (productId, token) => {
  return authGet();
};
