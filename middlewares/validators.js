const { body } = require("express-validator");

// HOST Signup Validation
exports.hostSignupValidation = [
  body("hostName")
    .trim()
    .notEmpty().withMessage("Host name is required.")
    .isLength({ min: 2 }).withMessage("Host name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Host name should only contain letters and spaces"),

  body("department")
    .trim()
    .notEmpty().withMessage("Department is required"),
    
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

// HOST Login Validation
exports.hostLoginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
];

// STUDENT Signup Validation
exports.studentSignupValidation = [
  body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters")
    .matches(/^[a-zA-Z\s]+$/).withMessage("Name should only contain letters and spaces"),

  body("branch")
    .trim()
    .notEmpty().withMessage("Branch is required"),

  body("session")
    .trim()
    .notEmpty().withMessage("Session is required")
    .matches(/^\d{4}-\d{4}$/).withMessage("Session must be in format YYYY-YYYY (e.g., 2020-2024)"),

  body("rollno")
    .trim()
    .notEmpty().withMessage("Roll number is required")
    .isLength({ min: 6, max: 20 }).withMessage("Roll number must be contain 12 Characters")
    .matches(/^[0-9]+$/).withMessage("Roll number should only contain Numeric characters"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("campus")
    .trim()
    .notEmpty().withMessage("Campus is required")
    .isLength({ min: 2 }).withMessage("Campus must be at least 2 characters"),

  body("result")
    .optional()
    .isArray().withMessage("Result must be an array")
];

// STUDENT Login Validation
exports.studentLoginValidation = [
  body("rollno")
    .trim()
    .notEmpty().withMessage("Roll number is required")
    .isLength({ min: 12 }).withMessage("Roll number must contain 12 Numbers"),

  body("password")
    .notEmpty().withMessage("Password is required")
];
