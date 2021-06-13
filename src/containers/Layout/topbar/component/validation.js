/* eslint-disable */
const validate = (values) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "Old Password field shouldn’t be empty";
  } else if (values.oldPassword.length < 3) {
    errors.oldPassword = "The old password should be greater than 4";
  }
  if (!values.newPassword) {
    errors.newPassword = "New Password field shouldn’t be empty";
  } else if (values.newPassword.length < 3) {
    errors.newPassword = "The new password should be greater than 4";
  }

  return errors;
};

export default validate;
