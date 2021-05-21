import {
  ENQUARY_LIST_FAIL,
  ENQUARY_LIST_START,
  ENQUARY_LIST_SUCCESS,
} from "../actions/enquary";
import { updateObject } from "./helper";

const init = {
  loading: false,
  enquaries: [],
  enquaryList: false,
  error: false,
};

const reducer = (state = init, action) => {
  console.log(action);
  switch (action.type) {
    case ENQUARY_LIST_START:
      return updateObject(state, { loading: true, enquaryList: true });
    case ENQUARY_LIST_SUCCESS:
      console.log("I am here");
      return updateObject(state, { loading: false, enquaries: action.payload });
    case ENQUARY_LIST_FAIL:
      return updateObject(state, {
        loading: false,
        error: action.payload,
      });
    default:
      return state;
  }
};
export default reducer;
