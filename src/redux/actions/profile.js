import { loginUrl } from "../../utility/api";
import axios from "axios";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = async (username, password) => {
  return await axios.post(loginUrl, {
    username,
    password,
  });
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
