import React, { useState } from "react";
import { Button, ButtonToolbar, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import renderDropZoneField from "../../../shared/form/DropZone";
import inputField from "../../../component/imput/input";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../../../shared/notification/notification";
import {
  addCategorySuccess,
  addMainCategory,
} from "../../../redux/actions/category";
import { getBase64 } from "../../../utility/base64";

const validation = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name should not be empty";
  }
  return errors;
};

const AddMainCategoryForm = ({ handleSubmit, reset }) => {
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const [config, setconfig] = useState({
    loading: false,
    error: null,
  });
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    getBase64(data.image[0]).then(async (result) => {
      setconfig({ ...config, loading: true });
      try {
        const response = await addMainCategory(token, data.name, result);
        if (response.data.success) {
          dispatch(addCategorySuccess(response.data.created));
          setconfig({
            loading: false,
            error: false,
          });
          showNotification(
            theme,
            "ltr",
            "Success",
            "Successfully created Category",
            "success"
          );
          dispatch(reset("main_category"));
        } else {
          setconfig({
            loading: false,
            error: response.data.message,
          });
          showNotification(
            theme,
            "ltr",
            "Fail",
            response.data.message,
            "danger"
          );
        }
      } catch (err) {
        setconfig({
          loading: false,
          error: err.toString(),
        });
        showNotification(theme, "ltr", "Fail", err.toString(), "danger");
      }
    });
  };
  return (
    <form className="form product-edit px-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="form form--horizontal">
        <div className="form__form-group">
          <span className="form__form-group-label">Category Name</span>
          <div className="form__form-group-field">
            <Field
              name="name"
              className="form-control"
              component={inputField}
              type="text"
            />
          </div>
        </div>
        <Col md={12}>
          <div className="form__form-group">
            <span className="form__form-group-label">Upload photo</span>
            <div className="form__form-group-field">
              <Field name="image" component={renderDropZoneField} />
            </div>
          </div>
        </Col>

        <ButtonToolbar className="form__button-toolbar">
          <Button
            disabled={config.loading}
            className="btn-block"
            color="primary"
            type="submit"
          >
            {config.loading ? "Loading...." : "Save"}
          </Button>
        </ButtonToolbar>
      </div>
      {/* </div> */}
    </form>
  );
};

export default reduxForm({
  validate: validation,
  form: "main_category", // a unique identifier for this form
})(AddMainCategoryForm);
