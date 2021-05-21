import { categoriesUrl } from "../../utility/api";
import { authGet } from "../../utility/request";
export const LIST_CATEGORY_SUCCESS = "LIST_CATEGORY_SUCCESS";
export const LIST_CATEGORY_FAIL = "LIST_CATEGORY_FAIL";
export const LIST_CATEGORY_START = "LIST_CATEGORY_START";

const fetchCategorySatrt = () => {
  return {
    type: LIST_CATEGORY_START,
  };
};

const fetchCategoryFail = (err) => {
  return {
    type: LIST_CATEGORY_FAIL,
    payload: err.toString(),
  };
};

const fetchCategorySuccess = (data) => {
  return {
    type: LIST_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const fetchCategory = (token) => async (dispatch) => {
  dispatch(fetchCategorySatrt());
  try {
    const response = await authGet(categoriesUrl, token);
    if (response.data.success) {
      dispatch(fetchCategorySuccess(response.data.data));
    } else {
      dispatch(fetchCategoryFail(response.data.message));
    }
  } catch (err) {
    dispatch(fetchCategoryFail("Something went wrong"));
  }
};
