import React from "react";
import { Button, ButtonToolbar, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import renderDropZoneField from "../../../shared/form/DropZone";
// import renderDropZone from "../../../shared/form/DropZone";

const AddMainCategoryForm = ({ handleSubmit, reset }) => {
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
  form: "product_edit_form", // a unique identifier for this form
})(AddMainCategoryForm);
