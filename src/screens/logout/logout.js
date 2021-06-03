import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { logout } from "../../redux/actions/profile";

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(logout());
  return <Redirect to="/" />;
};

export default Logout;
