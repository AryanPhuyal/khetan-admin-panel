const validation = (values) => {
  let errors = {};
  if (!values.name) {
    errors["name"] = "Titel should be given";
  } else if (values.length < 2) {
    errors["name"] = "Title must be greater then 2";
  }
  if (!values.subtitle) {
    errors["subtitle"] = "Sub_Titel should be given";
  } else if (values.length < 2) {
    errors["subtitle"] = "Sub_Title must be greater then 2";
  }
  if (!values.btntext) {
    errors["btntext"] = "Button text is required";
  }

  if (!values.price || values.price === 0) {
    errors["price"] = "Price is required";
  }
  if (!values.type) {
    errors["type"] = "Type is required";
  }

  if (!values.link || values.stock === 0) {
    errors["link"] = "link is required";
  }

  return errors;
};

export default validation;
