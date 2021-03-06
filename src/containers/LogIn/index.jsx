import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "mdi-react/FacebookIcon";
import GooglePlusIcon from "mdi-react/GooglePlusIcon";
import LogInForm from "./components/LogInForm";

const LogIn = () => {
  return (
    <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Welcome to
              <span className="account__logo">
                {" "}
                Travel
                <span className="account__logo-accent">Right</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">Login to admin Panels</h4>
          </div>
          <LogInForm />
          {/* <div className="account__or">
            <p>Or Easily Using</p>
          </div>
          <div className="account__social">
            <Link
              className="account__social-btn account__social-btn--facebook"
              to=""
            >
              <FacebookIcon />
            </Link>
            <Link
              className="account__social-btn acco unt__social-btn--google"
              to=""
            >
              <GooglePlusIcon />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/components/form.scss to add styles
