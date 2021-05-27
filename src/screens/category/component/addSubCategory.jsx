import React, { useState } from "react";
import { Button, ButtonToolbar, Col } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import renderDropZoneField from "../../../shared/form/DropZone";
import { useSelector, useDispatch } from "react-redux";
import { getBase64 } from "../../../utility/base64";
import {
  addCategorySuccess,
  addSubCategory,
} from "../../../redux/actions/category";
import { showNotification } from "../../../shared/notification/notification";

const AddSubCategory = ({ handleSubmit, reset }) => {
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const [config, setconfig] = useState({
    loading: false,
    error: null,
  });
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const onSubmit = (data) => {
    getBase64(data.image[0]).then(async (result) => {
      setconfig({ ...config, loading: true });
      try {
        const response = await addSubCategory(
          token,
          data.name,
          result,
          data.category
        );
        if (response.data.success) {
          dispatch(addCategorySuccess(response.data.data));
          setconfig({
            loading: false,
            error: false,
          });
          showNotification(
            theme,
            "ltr",
            "Success",
            "Successfully created Sub Category",
            "success"
          );
          dispatch(reset("sub_category"));
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
        console.log(err);
        setconfig({
          loading: false,
          error: err.toString(),
        });
        showNotification(theme, "ltr", "Fail", err.toString(), "danger");
      }
    });
  };

  const { categories, loading } = useSelector((state) => state.category);
  const mainCategory = categories.filter((x) => x.type === 1);
  return (
    <form className="form product-edit px-5" onSubmit={handleSubmit(onSubmit)}>
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
              <Field name="image" component={renderDropZoneField} />
            </div>
          </div>
        </Col>

        <Col md={12}>
          <div className="form__form-group">
            <span className="form__form-group-label">Main Category</span>
            <div className="form__form-group-field">
              <Field
                name="category"
                className="form-control form-control-lg"
                component="select"
              >
                <option value={null} className="form__form-group-label">
                  Select Category
                </option>
                {mainCategory.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.title}
                  </option>
                ))}
              </Field>
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
            {config.loading ? "Loading..." : "Save"}
          </Button>
        </ButtonToolbar>
      </div>
      {/* </div> */}
    </form>
  );
};

export default reduxForm({
  form: "sub_category", // a unique identifier for this form
})(AddSubCategory);
