import {
  ADD_CATEGORY_SUCCESS,
  LIST_CATEGORY_FAIL,
  LIST_CATEGORY_START,
  LIST_CATEGORY_SUCCESS,
} from "../actions/category";
import { updateObject } from "./helper";

const init = {
  loading: false,
  addCategory: false,
  listCategory: false,
  error: null,
  categories: [],
};
// category ---1
//     childcategory ----2
//          subcategory -----3

const listCategorySuccess = (state, action) => {
  let newCategory = [];
  action.payload.forEach((data) => {
    newCategory.push({
      _id: data._id,
      title: data.name,
      slug: data.slug,
      image: data.image,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      type: 1,
    });
    if (data.children)
      data.children.forEach((e) => {
        newCategory.push({
          _id: e._id,
          title: e.name,
          slug: e.slug,
          image: e.image,
          createdAt: e.createdAt,
          updatedAt: e.updatedAt,
          mainCategory: data._id,

          type: 2,
        });
        if (e.children)
          e.children.forEach((f) => {
            newCategory.push({
              _id: f._id,
              subCategory: e._id,
              mainCategory: data._id,
              title: f.name,
              slug: f.slug,
              image: f.image,
              createdAt: f.createdAt,
              updatedAt: f.updatedAt,
              type: 3,
            });
          });
      });
  });
  return updateObject(state, {
    categories: newCategory,
    loading: false,
  });
};

const addCategorySuccess = (state,action)=> {
  console.log(action)
  return state;
  } 

const reducer = (state = init, action) => {
  switch (action.type) {
    case LIST_CATEGORY_START:
      return updateObject(state, { loading: true, listCategory: true });
    case LIST_CATEGORY_FAIL:
      return updateObject(state, { loading: false, error: action.payload });
    case LIST_CATEGORY_SUCCESS:
      return listCategorySuccess(state, action);
      case ADD_CATEGORY_SUCCESS:
        return addCategorySuccess(state,action)
    default:
      return state;
  }
};
export default reducer;
