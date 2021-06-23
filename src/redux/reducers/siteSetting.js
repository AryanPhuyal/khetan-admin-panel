import {
  ADVERTISMENT_ADD_SUCCESS,
  ADVERTISMENT_FAIL,
  ADVERTISMENT_SUCCESS,
  ADVERTISMENT_START,
  ADVERTISMENT_DELETE_SUCCESS,
} from "../actions/siteSetting";
import {updateObject} from "./helper";

const init = {
  loading: false,
  success: false,
  error: "",
  ads: [],
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case ADVERTISMENT_START:
      return updateObject(state, {loading: true});
    case ADVERTISMENT_SUCCESS:
      return updateObject(state, {
        loading: false,
        ads: action.payload,
        success: true,
      });
    case ADVERTISMENT_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.payload,
        success: false,
      });
    case ADVERTISMENT_ADD_SUCCESS:
      const initAds = [...state.ads];
      initAds.push(action.payload);
      return updateObject(state, {
        loading: false,
        ads: [...initAds],
        error: false,
        success: true,
      });
    case ADVERTISMENT_DELETE_SUCCESS:
      const initialState = [...state.ads];
      const toDelete = initialState.find((x) => x._id === action.payload)[0];
      const indexToDelete = initialState.indexOf(toDelete);
      toDelete.splice(indexToDelete);
      window.location.reload();
      return updateObject(state, {
        loading: false,
        error: false,
        ads: [...initialState],
      });
    default:
      return state;
  }
};
export default reducer;
