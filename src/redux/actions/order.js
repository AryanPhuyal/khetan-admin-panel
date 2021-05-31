import {
  cancilOrderApi,
  completeOrderApi,
  declineOrderApi,
  listOrderUrl,
  orderDescriptionApi,
  refundOrderApi,
  shipOrderApi,
} from "../../utility/api";
import { authGet, authPost, authPut } from "../../utility/request";

export const FETCH_ORDER_SATRT = "FETCH_ORDER_SATRT";
export const FETCH_ORDER_SUCCESS = "FETCH_ORDER_SUCCESS";
export const FETCH_ORDER_FAIL = "FETCH_ORDER_FAIL";
export const CHANGE_ORDER_STATUS = "CHANGE_ORDER_STATUS";

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

export const orderDetails = (token, orderId) => {
  return authGet(orderDescriptionApi(orderId), token);
};
export const changeOrderStatus = (orderId, status) => {
  return {
    type: CHANGE_ORDER_STATUS,
    payload: {
      orderId,
      status,
    },
  };
};

export const orderConfirm = (token, orderId) => {
  return authPut(orderConfirm(orderId), {}, token);
};
export const cancilOrder = (token, orderId) => {
  return authPut(cancilOrderApi(orderId), {}, token);
};
export const declineOrder = (token, orderId) => {
  return authPut(declineOrderApi(orderId), {}, token);
};
export const shipOrder = (token, orderId) => {
  return authPut(shipOrderApi(orderId), {}, token);
};
export const refundOrder = (token, orderId) => {
  return authPut(refundOrderApi(orderId), {}, token);
};
export const completeOrder = (token, orderId) => {
  return authPut(completeOrderApi(orderId), {}, token);
};
