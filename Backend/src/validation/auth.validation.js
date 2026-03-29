import { body, validationResult } from "express-validator";

const validateAuth = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

const authValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters"),
  body("email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phone")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 digits long")
    .matches(/^[0-9]+$/)
    .withMessage("Phone number must contain only digits"),
  validateAuth,
];

export default authValidation;
