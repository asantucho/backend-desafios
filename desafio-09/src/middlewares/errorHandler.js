import createResponse from '../utils/createResponse.js';

export const errorHandler = (error, req, res, next) => {
  console.log(`error ${error.message}`);
  const status = error.status || 400;
  createResponse(res, status, error.message);
};
