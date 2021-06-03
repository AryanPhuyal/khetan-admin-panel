import { LOGIN, LOGOUT } from "../actions/profile";
import { updateObject } from "./helper";

// let user = {};
// let loggedIn = false;
// if (localStorage.getItem("user")) {
//   user = await );
//   loggedIn = true;
// }
const init = {
  user: JSON.parse(localStorage.getItem("user")),
  loggedIn: JSON.parse(localStorage.getItem("user")) ? true : false,
};

const reducer = (state = init, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload, loggedIn: true };

    case LOGOUT:
      localStorage.removeItem("user");
      return updateObject(state, {
        user: null,
        loggedIn: false,
      });
    default:
      return state;
  }
};

export default reducer;
