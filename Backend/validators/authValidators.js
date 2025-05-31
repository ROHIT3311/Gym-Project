const { body } = require("express-validator");

module.exports.registerValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("First Name is Required")
    .matches(/^[A-Z][a-z]*$/)
    .withMessage("First Name must start with capital letter"),

  body("lastName")
    .notEmpty()
    .withMessage("First Name is Required")
    .matches(/^[A-Z][a-z]*$/)
    .withMessage("First Name must start with capital letter"),

  body("email").isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[\W_]/)
    .withMessage("Password must contain at least one special character"),
];
