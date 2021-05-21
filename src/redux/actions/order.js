import { listOrderUrl } from "../../utility/api";
import { authGet } from "../../utility/request";
import { FETCH_PRODUCT_START } from "./product";

export const FETCH_ORDER_SATRT = "FETCH_ORDER_SATRT";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAIL = "FETCH_ORDER_FAIL";

const fetchOrderStart = () => {
  return {
    type: FETCH_ORDER_SATRT,
  };
};

const fetchOrderSuccess = (data) => {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: data,
  };
};

const fethcOrderFail = (err) => {
  return {
    type: FETCH_ORDER_FAIL,
    payload: err,
  };
};

export const fetchOrder = (token) => async (dispatch) => {
  dispatch(fetchOrderStart());
  try {
    const response = await authGet(listOrderUrl, token);
    if (response.data.success) {
      dispatch(fetchOrderSuccess(response.data.data));
    } else {
      dispatch(fethcOrderFail(response.data.message));
    }
  } catch (err) {
    dispatch(fethcOrderFail(err.toString()));
  }
};
