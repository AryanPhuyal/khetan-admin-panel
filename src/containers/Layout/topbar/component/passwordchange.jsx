import React, {useState} from "react";
import EyeIcon from "mdi-react/EyeIcon";
import {Field, reduxForm, Form} from "redux-form";
import validate from "./validation";
import inputField from "./input";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
const Passwordchange = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const {buttonLabel, className} = props;
  const [modal, setModal] = useState(false);
  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const toggle = () => setModal(!modal);
  return (
    <>
      <Button color="light" className="custom_button" onClick={toggle}>
        Password Change
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Password Change</ModalHeader>
        <ModalBody>
          <Form>
            <div className="form__form-group">
              <span className="form__form-group-label">Old Password</span>
              <div className="form__form-group-field">
                <Field
                  name="oldPassword"
                  component={inputField}
                  type="text"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">New Password</span>
              <div className="form__form-group-field">
                <Field
                  name="newPassword"
                  component={inputField}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <button
                  type="button"
                  className={`form__form-group-button${
                    showPassword ? " active" : ""
                  }`}
                  onClick={showPasswordToggle}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default reduxForm({
  validate: validate,
  form: "Passwordchange",
})(Passwordchange);
