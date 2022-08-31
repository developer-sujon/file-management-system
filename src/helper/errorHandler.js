//Create Custom Error
const createError = (msg = "Server Error Occured", status = 400) => {
  const e = new Error(msg);
  e.status = status;
  return e;
};

//Not Found Error Handler
const notFoundError = (req, res, next) => {
  const err = createError(`Your Requested Content was not found on this`, 404);
  next(err);
};

//Default Error Handler
const defaultErrorHandler = (err, req, res, next) => {
  const message = err.message ? err.message : "Server Error Occured";
  const status = err.status ? err.status : 500;

  res.status(status).json({
    message,
    stack: err.stack,
  });

  //create error log file
};

module.exports = { defaultErrorHandler, createError, notFoundError };
