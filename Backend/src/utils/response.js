const successResponse = (res, data = null, message = 'Success') => {
  res.status(200).json({
    success: true,
    data,
    message
  });
};

const createdResponse = (res, data = null, message = 'Created') => {
  res.status(201).json({
    success: true,
    data,
    message
  });
};

const errorResponse = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    error: error.message || 'Internal Server Error'
  });
};

module.exports = {
  successResponse,
  createdResponse,
  errorResponse
};