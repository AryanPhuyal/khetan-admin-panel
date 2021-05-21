import React, { useState } from "react";
import { Button, ButtonToolbar, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { MenuItem, TextField } from "@material-ui/core";
import renderDropZoneField from "../../../shared/form/DropZone";
import { useSelector } from "react-redux";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  children,
  select,
}) => (
  <TextField
    className="material-form__field"
    label={label}
    error={touched && error}
    value={input.value}
    children={children}
    select={select}
    onChange={(e) => {
      e.preventDefault();
      input.onChange(e.target.value);
    }}
  />
);
const AddChildCategory = ({ handleSubmit, reset }) => {
  const { categories, loading } = useSelector((state) => state.category);
  const mainCategory = categories.filter((x) => x.type === 1);
  const subCategory = categories.filter((x) => x.type === 2);

  console.log(mainCategory);
  return (
    <form className="form product-edit px-5" onSubmit={handleSubmit}>
      <div className="form form--horizontal">
        <div className="form__form-group">
          <span className="form__form-group-label">Category Name</span>
          <div className="form__form-group-field">
            <Field name="name" component="input" type="text" />
          </div>
        </div>
        <Col md={12}>
          <div className="form__form-group">
            <span className="form__form-group-label">Upload photo</span>
            <div className="form__form-group-field">
              <Field name="files" component={renderDropZoneField} />
            </div>
          </div>
        </Col>
        <Col md={12}>
          <div className="form__form-group">
            <span className="material-form__label">Main Category</span>
            <div className="form__form-group-field">
              <Field
                name="favoriteColor"
                className="form-control form-control-lg"
                component="select"
              >
                {mainCategory.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.title}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </Col>

        <Col md={12}>
          <div className="form__form-group">
            <span className="material-form__label">Sub Category</span>
            <div className="form__form-group-field">
              <Field
                name="favoriteColor"
                className="form-control form-control-lg"
                component="select"
              >
                {subCategory.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.title}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </Col>
        <ButtonToolbar className="form__button-toolbar">
          <Button className="btn-block" color="primary" type="submit">
            Save
          </Button>
        </ButtonToolbar>
      </div>
      {/* </div> */}
    </form>
  );
};

export default reduxForm({
  form: "child_category", // a unique identifier for this form
})(AddChildCategory);
