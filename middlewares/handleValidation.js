const { validationResult } = require("express-validator");

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let extractedErrors = errors.array().map(err => err.msg);
    
    // Flash the first error message
    req.flash("error", extractedErrors[0]);
    
    // Determine redirect path based on the original route
    const originalPath = req.originalUrl || req.path;
    
    // Redirect to the appropriate signup/login page based on the route
    if (originalPath.includes('/host/signup')) {
      return res.redirect('/host/signup');
    } else if (originalPath.includes('/host/login')) {
      return res.redirect('/host/login');
    } else if (originalPath.includes('/student/signup')) {
      return res.redirect('/student/signup');
    } else if (originalPath.includes('/student/login')) {
      return res.redirect('/student/login');
    }
    
    // Fallback to home page if route doesn't match
    return res.redirect("/");
  }

  next();
};
