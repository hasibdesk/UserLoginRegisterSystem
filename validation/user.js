const Validator = require("validator");
const isEmpty = require("./isEmpty");

function validateUserRegistration(input) {
  let errors = {};

  input.name = !isEmpty(input.name) ? input.name : "";
  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";
  input.password2 = !isEmpty(input.password2) ? input.password2 : "";

  if (!Validator.isLength(input.name, { min: 3, max: 50 })) {
    errors.name = "Name must be between 2 and 50 character";
  }

  if (Validator.isEmpty(input.name)) {
    errors.name = "Name field is required";
  }

  if (!Validator.isEmail(input.email)) {
    errors.email = "Please enter valid Email";
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isLength(input.password, { min: 6, max: 20 })) {
    errors.password = "Password must be between 6 and 20 character";
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(input.password2, { min: 6, max: 20 })) {
    errors.password2 = "Confirm Password must be between 6 and 20 character";
  }
  if (!Validator.equals(input.password2, input.password)) {
    errors.password2 = "Confirm Password Doesn't Match!";
  }
  if (Validator.isEmpty(input.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  return { errors, isValid: isEmpty(errors) };
}

function validateUserLogin(input) {
  let errors = {};

  input.email = !isEmpty(input.email) ? input.email : "";
  input.password = !isEmpty(input.password) ? input.password : "";

  if (!Validator.isEmail(input.email)) {
    errors.email = "Please enter valid Email";
  }
  if (Validator.isEmpty(input.email)) {
    errors.email = "Email field is required";
  }
  if (!Validator.isLength(input.password, { min: 6, max: 20 })) {
    errors.password = "Password must be between 6 and 20 character";
  }
  if (Validator.isEmpty(input.password)) {
    errors.password = "Password field is required";
  }

  return { errors, isValid: isEmpty(errors) };
}

module.exports = { validateUserRegistration, validateUserLogin };
