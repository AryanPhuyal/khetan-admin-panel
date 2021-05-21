import {
  FETCH_VENDOR_FAIL,
  FETCH_VENDOR_START,
  FETCH_VENDOR_SUCCESS,
} from "../actions/vendors";
import { updateObject } from "./helper";

const init = {
  loading: false,
  error: false,
  vendors: [],
  listVendor: false,
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case FETCH_VENDOR_START:
      return updateObject(state, { loading: true, listVendor: true });
    case FETCH_VENDOR_FAIL:
      return updateObject(state, { loading: false, error: action.payload });
    case FETCH_VENDOR_SUCCESS:
      return updateObject(state, { loading: false, vendors: action.payload });
    default:
      return state;
  }
};
export default reducer;
