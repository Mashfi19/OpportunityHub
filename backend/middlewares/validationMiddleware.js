// Middleware validator factory wrapper
function validate(validatorFn) {
  return (req, res, next) => {
    const result = validatorFn(req.body);
    
    if (!result.success) {
      return res.status(400).json({
        error: "Input validation failed.",
        details: result.error.flatten().fieldErrors,
        status: 400
      });
    }
    
    // Replace req.body with the parsed/coerced validated data
    req.body = result.data;
    next();
  };
}

module.exports = validate;
