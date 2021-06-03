import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import renderCheckBoxField from "../../../shared/components/form/CheckBox";
import validate from "./validation";
import { Button } from "reactstrap";
import inputField from "../../../component/imput/input";
import { login, loginSuccess } from "../../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../../../shared/notification/notification";
const LogInForm = ({ handleSubmit }) => {
  const theme = useSelector((state) => state.theme);

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const showPassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      setloading(true);
      const response = await login(data.name, data.password);
      if (response.data.success) {
        const user = response.data.data;
        user["token"] = response.data.token;
        showNotification(
          theme,
          "ltr",
          "Success",
          "Successfully Logged In",
          "success"
        );
        dispatch(loginSuccess(user));
        setloading(false);
      } else {
        showNotification(
          theme,
          "ltr",
          "Failed",
          response.data.message,
          "danger"
        );
        setloading(false);
        seterror(response.data.message);
      }
    } catch (err) {
      showNotification(theme, "ltr", "Failed", err.toString(), "danger");
      setloading(false);
      seterror("Something went wrong");
    }
  };

  return (
    <form className="form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="form__form-group">
        <span className="form__form-group-label">Username</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Field
            name="name"
            type="text"
            placeholder="Name"
            component={inputField}
          />
        </div>
      </div>
      <div className="form__form-group">
        <span className="form__form-group-label">Password</span>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <KeyVariantIcon />
          </div>
          <Field
            name="password"
            type={isPasswordShown ? "text" : "password"}
            placeholder="Password"
            component={inputField}
          />
          <button
            className={`form__form-group-button${
              isPasswordShown ? " active" : ""
            }`}
            onClick={() => showPassword()}
            type="button"
          >
            <EyeIcon />
          </button>
        </div>
        <div className="account__forgot-password">
          <a href="/">Forgot a password?</a>
        </div>
      </div>
      <div className="form__form-group">
        <div className="form__form-group-field">
          <Field
            name="remember_me"
            component={renderCheckBoxField}
            label="Remember me"
          />
        </div>
      </div>
      <Button
        disabled={loading}
        className="btn btn-primary account__btn account__btn--small"
        type="submit"
      >
        {!loading ? "Sign In" : "Loading..."}
      </Button>

      {/* <Link
        className="btn btn-outline-primary account__btn account__btn--small"
        to="/log_in"
      >
        Create Account
      </Link> */}
    </form>
  );
};

export default reduxForm({
  validate: validate,
  form: "log_in_form",
})(LogInForm);
