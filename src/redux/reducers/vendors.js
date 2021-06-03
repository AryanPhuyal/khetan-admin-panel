import {
  APPROVE_VENDOR,
  FETCH_VENDOR_FAIL,
  FETCH_VENDOR_START,
  FETCH_VENDOR_SUCCESS,
  SUSPEND_VENDOR,
} from "../actions/vendors";
import { updateObject } from "./helper";

const init = {
  loading: false,
  error: false,
  vendors: [],
  listVendor: false,
};

const suspendVendor = (state, action) => {
  var vendorsLIst = state.vendors;
  let changedVendor = vendorsLIst.find((e) => e.id === action.id);
  if (changedVendor) {
    changedVendor = { ...changedVendor, status: 3 };
  }
  console.log('Here')
  return updateObject(...state, [...vendorsLIst, changedVendor]);
};

const approveVendor = (state, action) => {
  var vendorsLIst = state.vendors;
  let changedVendor = vendorsLIst.find((e) => e.id === action.id);
  if (changedVendor) {
    changedVendor = { ...changedVendor, status: 2 };
  }
  return updateObject(...state, [...vendorsLIst, changedVendor]);
};

const reducer = (state = init, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_VENDOR_START:
      return updateObject(state, { loading: true, listVendor: true });
    case FETCH_VENDOR_FAIL:
      return updateObject(state, { loading: false, error: action.payload });
    case FETCH_VENDOR_SUCCESS:
      return updateObject(state, { loading: false, vendors: action.payload });
    case SUSPEND_VENDOR:
      // return suspendVendor(state, action);
    case APPROVE_VENDOR:
      return approveVendor(state, action);
    default:
      return state;
  }
};
export default reducer;
