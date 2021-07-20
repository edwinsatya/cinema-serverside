module.exports = (err, req, res, next) => {
  let status;
  let message;
  let errors = {};
  console.log(err.name, "error name");
  console.log(err.status, "error statusnya");
  console.log(err.errors, "errornya");
  console.log(err.message, "errornya");
  console.log(err, "error name");
  if (err.name === "ValidationError") {
    status = 400;
    errors = err.errors;
  } else if (err.name === "JsonWebTokenError" || err.status === 401) {
    status = 401;
    message = err.message || "Unauthorized";
    errors.message = message;
  } else if (err.status == 403) {
    status = 403;
    message = err.message;
    errors.message = message;
  } else if (err.status == 404) {
    status = 404;
    message = err.message || "Not found";
    errors.message = message;
  } else {
    status = 500;
    message = err.message || "Internal Server Error";
    errors.message = message;
  }

  res.status(status).json({
    status,
    errors,
  });
};
