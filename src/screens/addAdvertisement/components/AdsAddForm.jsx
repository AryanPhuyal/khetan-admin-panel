import React, {useEffect, useState} from "react";

import {Button, ButtonToolbar} from "reactstrap";
import {Field, reduxForm} from "redux-form";
import TagIcon from "mdi-react/TagIcon";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../shared/form/Input";

import validate from "./validation";
import renderDropZoneField from "../../../shared/form/DropZone";
import renderSelectField from "../../../shared/form/Select";
import {addAdvertisment} from "../../../redux/actions/siteSetting";

const AdsAddForm = ({handleSubmit, reset}) => {
  const dispatch = useDispatch();
  let data = [
    {label: "LARGE_BANNER"},
    {label: "SMALL_BANNER"},
    {label: "ADS"},
    {label: "RECOMMENDED_CATEGORY"},
    {label: "CATEGORY_SLIDERS"},
  ];

  const [fileBase64String, setFileBase64String] = useState("");

  const [descr, setDescr] = useState("");
  const [config, setconfig] = useState({loading: false, error: null});

  const {loading, error, ads, success} = useSelector(
    (state) => state.advertisment
  );

  const encodeFileBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var Base64 = reader.result;
        console.log(Base64);
        setFileBase64String(Base64);
      };
      reader.onerror = (error) => {
        // console.log("error: ", error);
      };
    }
  };
  const {
    user: {token},
  } = useSelector((state) => state.user);

  const AdsAdd = async (data) => {
    // console.log("what happen");
    const file = data.image[0];
    encodeFileBase64(file);
    const nd = fileBase64String.split(";base64,");
    const imagess = nd[1];
    // console.log(data);

    if (!imagess == "") {
      const datas = {
        type: data.type.label,
        content: {
          title: data.title,
          subTitle: data.subtitle,
          btnText: data.btntext,
          image: data.image,
          price: data.price,
        },
      };
      dispatch(addAdvertisment(datas, token));
    }
  };

  return (
    <form className="form product-add" onSubmit={handleSubmit(AdsAdd)}>
      <div className="form__half">
        <div className="form__form-group">
          <span className="form__form-group-label">Type</span>
          <div className="form__form-group-field">
            <Field
              name="type"
              component={renderSelectField}
              type="text"
              options={data}
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Ads Title</span>
          <Field name={"title"} component={Input} />
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Ads Sub_Title</span>
          <Field name={"subtitle"} component={Input} />
        </div>

        <div className="form__form-group ">
          <span className="form__form-group-label">Button Text</span>
          <Field name={"btntext"} component={Input} />
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Link</span>
          <Field name={"link"} component={Input} />
        </div>
        <div className="form__form-group-price-discount">
          <div className="form__form-group form__form-group-price">
            <span className="form__form-group-label">Price</span>
            <Field name={"price"} component={Input}></Field>
          </div>
        </div>
      </div>
      <div className="form__half">
        <div className="form__form-group" style={{height: "50%"}}>
          <span className="form__form-group-label">Image</span>
          <div className="form__form-group-field">
            <Field name="image" component={renderDropZoneField} />
          </div>
        </div>
      </div>

      <br />
      <span className="form__form-group-error">
        {error ? error : success ? success : ""}
      </span>
      <ButtonToolbar className="form__button-toolbar">
        <Button color="primary">{loading ? "Loading..." : "Save"}</Button>
        <Button type="button" onClick={reset}>
          Cancel
        </Button>
      </ButtonToolbar>
    </form>
  );
};

export default reduxForm({
  form: "ads_add_form", // a unique identifier for this form
  validate: validate,
})(AdsAddForm);
