class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  console.log(err.message);

  err.message = err.message || "Internal Server error";
  err.statusCode = err.statusCode || 500;
  return res.status(err.statusCode).send({
    success: false,
    // message: "Invalid Id",
    message: err.message,
  });
};

export default ErrorHandler;
