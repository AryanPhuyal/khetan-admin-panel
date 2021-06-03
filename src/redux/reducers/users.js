import {
  LIST_USERS_FAIL,
  LIST_USERS_START,
  LIST_USERS_SUCCESS,
} from "../actions/users";
import { updateObject } from "./helper";

const init = {
  loading: false,
  error: null,
  listUsers: false,
  users: [],
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case LIST_USERS_START:
      return updateObject(state, { loading: true, listUsers: true });
    case LIST_USERS_SUCCESS:
      return updateObject(state, { loading: false, users: action.payload });
    case LIST_USERS_FAIL:
      return updateObject(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default reducer;
