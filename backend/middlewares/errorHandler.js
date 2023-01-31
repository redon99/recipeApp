const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: 500,
    message: 'Something went wrong! Try again later.',
  };

  if (err.name === 'ValidationError') {
    defaultError.statusCode = 400;
    // defaultError.message = err.message;
    defaultError.message = Object.values(err.errors)
      .map(item => item.message)
      .join(',');
  }

  if (err.code && err.code === 11000) {
    defaultError.statusCode = 400;
    defaultError.message = `${Object.keys(err.keyValue)} already in use.`;
  }

  res.status(defaultError.statusCode).json({
    // message: err,
    message: defaultError.message,
  });
};

module.exports = errorHandlerMiddleware;
