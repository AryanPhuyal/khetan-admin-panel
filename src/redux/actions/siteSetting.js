import {siteSettingapi} from "../../utility/api";
import {authGet, authPost, authDelete} from "../../utility/request";
export const ADVERTISMENT_SUCCESS = "ADVERTISMENT_SUCCESS";
export const ADVERTISMENT_FAIL = "ADVERTISMENT_FAIL";
export const ADVERTISMENT_START = "ADVERTISMENT_START";
export const ADVERTISMENT_ADD_SUCCESS = "ADVERTISMENT_ADD_SUCCESS";
export const ADVERTISMENT_DELETE_SUCCESS = "ADVERTISMENT_DELETE_SUCCESS";

const fatchAdvertismentStart = () => {
  return {
    type: ADVERTISMENT_START,
  };
};
const fatchAdvertismentSuccess = (data) => {
  return {
    type: ADVERTISMENT_SUCCESS,
    payload: data,
  };
};

const fatchAdvertismentFail = (err) => {
  return {
    type: ADVERTISMENT_FAIL,
    payload: err,
  };
};
const addAdvertismentSuccess = (data) => {
  return {
    type: ADVERTISMENT_ADD_SUCCESS,
    payload: data,
  };
};

const deleteAdvertismentSuccess = (id) => {
  return {
    type: ADVERTISMENT_DELETE_SUCCESS,
    payload: id,
  };
};

export const fatchAdvertisment = (token) => async (dispatch) => {
  dispatch(fatchAdvertismentStart());
  try {
    const res = await authGet(siteSettingapi, token);

    if (res.status) {
      dispatch(fatchAdvertismentSuccess(res.data));
    } else {
      dispatch(fatchAdvertismentFail(res.data.message));
    }
  } catch (err) {
    dispatch(fatchAdvertismentFail(err));
  }
};

export const addAdvertisment = (data, token) => async (dispatch) => {
  dispatch(fatchAdvertismentStart());

  try {
    const res = await authPost(siteSettingapi, data, token);
    if (res.status) {
      dispatch(addAdvertismentSuccess(res.data));
    } else {
      dispatch(fatchAdvertismentFail(res.data.message));
    }
  } catch (err) {
    dispatch(fatchAdvertismentFail(err));
  }
};

export const deleteAdvertisment = (token, id) => async (dispatch) => {
  dispatch(fatchAdvertismentStart());
  try {
    const res = await authDelete(siteSettingapi + id, token);
    if (res.status) {
      dispatch(deleteAdvertismentSuccess(res.data.id));
    } else {
      dispatch(fatchAdvertismentFail(res.data.message));
    }
  } catch (err) {
    dispatch(fatchAdvertismentFail(err));
  }
};
