import { listUsersApi } from "../../utility/api";
import { authGet } from "../../utility/request";

export const LIST_USERS_START = "LIST_USERS_START";
export const LIST_USERS_SUCCESS = "LIST_USERS_SUCCESS";
export const LIST_USERS_FAIL = "LIST_USERS_FAIL";

const listUserStart = () => {
  return {
    type: LIST_USERS_START,
  };
};

const listUserSuccess = (data) => {
  return {
    type: LIST_USERS_SUCCESS,
    payload: data,
  };
};

const listUserFail = (err) => {
  return {
    type: LIST_USERS_FAIL,
    payload: err,
  };
};

export const fetchUsers = (token) => async (dispatch) => {
  dispatch(listUserStart());
  try {
    const response = await authGet(listUsersApi, token);
    if (response.data.success) {
      dispatch(listUserSuccess(response.data.data));
    } else {
      dispatch(listUserFail(response.data.message));
    }
  } catch (err) {
    dispatch(listUserFail(err.toString()));
  }
};
