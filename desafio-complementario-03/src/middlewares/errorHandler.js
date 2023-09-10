import { createResponse } from '../utils/createResponse.js';
import { developmentLogger, productionLogger } from '../utils/loggers.js';
import config from '../config.js';

export const errorHandler = (error, req, res, next) => {
  if (config.ENV === 'PROD') {
    productionLogger.error(`Error: ${error.message}`);
  } else {
    developmentLogger.error(`Error: ${error.message}`);
  }
  const status = error.status || 400;
  createResponse(res, status, error.message);
};
