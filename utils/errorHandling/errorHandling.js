// utils/errorHandling.js

import { fileLogger } from '../loggingUtils/loggingUtils';

export const handleTestError = (error) => {
    console.error('Test failed:', error.message);
    throw error;
  };

export const handleGraphQLError = (error) => {
  fileLogger.error(`Error Message: ${JSON.stringify(error.message)}`);
  fileLogger.error(`status: ${error.response.status}`);
  fileLogger.error(`statusText: ${error.response.statusText}`);
  fileLogger.error(`Error Response Data: ${JSON.stringify(error.response.data)}`)
  throw error;
};
