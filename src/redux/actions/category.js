import {
  addChildCategoryApi,
  addMainCategoryApi,
  addSubCategoryApi,
  categoriesUrl,
} from "../../utility/api";
import { authGet, authPost } from "../../utility/request";
export const LIST_CATEGORY_SUCCESS = "LIST_CATEGORY_SUCCESS";
export const LIST_CATEGORY_FAIL = "LIST_CATEGORY_FAIL";
export const LIST_CATEGORY_START = "LIST_CATEGORY_START";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

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

export const addCategorySuccess = (data) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    payload: data,
  };
};

export const addMainCategory = (token, name, icon) => {
  return authPost(addMainCategoryApi, { name, icon, publish: true }, token);
};
export const addSubCategory = (token, name, icon, parent) => {
  return authPost(
    addSubCategoryApi,
    { name, parent, icon, publish: true },
    token
  );
};
export const addChildCategory = (token, name, icon, parent, grandParent) => {
  return authPost(
    addChildCategoryApi,
    { name, parent, icon, grandParent, publish: true },
    token
  );
};

export const deleteCategory = (categoryId) => {
  return {
    type: DELETE_CATEGORY,
    payload: categoryId,
  };
};
