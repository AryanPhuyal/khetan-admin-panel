import React from "react";

const InputFile = ({
  input,
  value,
  placeholder,
  type,
  meta: { touched, error },
}) => {
  console.log(input);
  return (
    <div className="form-group">
      <input
        type="file"
        onChange={(e) => {
          e.preventDefault();

          //   convert files to an array
          //   const files = [...e.target.files];
          console.log(e.target.files);
          value = e.target.files;
        }}
      />
      {/* {touched && error && (
        <span className="form__form-group-error">{error}</span>
      )} */}
    </div>
  );
};

export default InputFile;
