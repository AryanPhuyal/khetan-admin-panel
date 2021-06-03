import {
  FETCH_ORDER_FAIL,
  FETCH_ORDER_SATRT,
  FETCH_ORDER_SUCCESS,
} from "../actions/order";
import { updateObject } from "./helper";

const init = {
  loading: false,
  listOrder: false,
  orders: [],
  error: null,
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case FETCH_ORDER_SATRT:
      return updateObject(state, { loading: true, listOrder: true });
    case FETCH_ORDER_FAIL:
      return updateObject(state, { loading: false, error: action.payload });
    case FETCH_ORDER_SUCCESS:
      return updateObject(state, { orders: action.payload, loading: false });
    default:
      return state;
  }
};

export default reducer;
