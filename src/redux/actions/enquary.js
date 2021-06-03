import { listEnquaryList } from "../../utility/api";
import { authGet } from "../../utility/request";

export const ENQUARY_LIST_START = "ENQUARY_LIST_START";
export const ENQUARY_LIST_SUCCESS = "ENQUARY_LIST_SUCCESS";
export const ENQUARY_LIST_FAIL = "ENQUARY_LIST_FAIL";

const enquaryListStart = () => {
  return {
    type: ENQUARY_LIST_START,
  };
};

const enquaryListSuccess = (data) => {
  return {
    type: ENQUARY_LIST_SUCCESS,
    payload: data,
  };
};

const enquaryListFail = (data) => {
  return {
    type: ENQUARY_LIST_FAIL,
    payload: data,
  };
};

export const fetchEnquaryList = (token) => async (dispatch) => {
  dispatch(enquaryListStart());
  try {
    const response = await authGet(listEnquaryList, token);
    if (response.data.success) {
      dispatch(enquaryListSuccess(response.data.data));
    } else {
      dispatch(enquaryListFail(response.data.message));
    }
  } catch (err) {
    dispatch(enquaryListFail(err.toString()));
  }
};
