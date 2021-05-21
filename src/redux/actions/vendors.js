import { listVendorApi } from "../../utility/api";
import { authGet } from "../../utility/request";

export const FETCH_VENDOR_START = "FETCH_VENDOR_START";
export const FETCH_VENDOR_SUCCESS = "FETCH_VENDOR_SUCCESS";
export const FETCH_VENDOR_FAIL = "FETCH_VENDOR_FAIL";

const fetchVendorStart = () => {
  return {
    type: FETCH_VENDOR_START,
  };
};
const fetchVendorSuccess = (data) => {
  return {
    type: FETCH_VENDOR_SUCCESS,
    payload: data,
  };
};

const fetchVendorFail = (err) => {
  return {
    type: FETCH_VENDOR_FAIL,
    payload: err,
  };
};

export const fetchVendor = (token) => async (dispatch) => {
  dispatch(fetchVendorStart());
  try {
    const response = await authGet(listVendorApi, token);
    if (response.data.success) {
      dispatch(fetchVendorSuccess(response.data.data));
    } else {
      dispatch(fetchVendorFail(response.data.message));
    }
  } catch (err) {
    dispatch(fetchVendorFail(err));
  }
};
