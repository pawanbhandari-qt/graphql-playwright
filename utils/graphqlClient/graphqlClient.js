// utils/graphqlClient.js

const axios = require('axios');
import { allure } from 'allure-playwright';
import { graphqlEndpoint, graphqlHeaders } from '../../config/config';
import { handleGraphQLError } from '../errorHandling/errorHandling';
import { fileLogger } from '../loggingUtils/loggingUtils';

async function sendGraphQLMutation(query, variables = {}, logDetails = { }) {
  const { allure: allureEnabled = true, file: fileEnabled = true, testName = '' } = logDetails;

  try {
    if (allureEnabled) {
      // Log request details to Allure  
      allure.step(`GraphQL Request For ${logDetails.testName}:`, () => {
        allure.attachment('Request URL', graphqlEndpoint, 'text/plain');
        allure.attachment('Request Headers', JSON.stringify(graphqlHeaders), 'application/json');
        allure.attachment('Request Query', query, 'application/json');
      });
    }

    if (fileEnabled) {
      // Log request details to file
      fileLogger.info(`GraphQL Request: ${logDetails.testName}`);
      fileLogger.info(`Request URL: ${graphqlEndpoint}`);
      fileLogger.info(`Request Headers: ${JSON.stringify(graphqlHeaders)}`);
      fileLogger.info(`Request Query: ${JSON.stringify(query.replace(/[\r\n]/g, ' ').trim())} \n${'-'.repeat(200)}`);
    }

    // Record the start time
    const startTime = new Date();

    // Make the GraphQL request
    const response = await axios.post(graphqlEndpoint, {
      query,
      variables,
    }, { headers: graphqlHeaders });

    // Record the end time
    const endTime = new Date();

    // Calculate the time taken
    const timeTaken = endTime - startTime;


    if (fileEnabled) {
      fileLogger.info(`Time taken (ms) "${logDetails.testName}": ${timeTaken}  \n${'-'.repeat(200)}`);
      // Log response details to file
      fileLogger.info(`GraphQL Response: ${logDetails.testName}`);
      fileLogger.info(`Response Status: ${response.status}`);
      fileLogger.info(`Response Headers: ${JSON.stringify(graphqlHeaders)}`);
      fileLogger.info(`Response Data: ${JSON.stringify(response.data)}\n${'-'.repeat(200)}`);
    }

    if (allureEnabled) {
      // Log response details to Allure
      allure.step(`GraphQL Response For ${logDetails.testName}:`, () => {
        allure.attachment('Response Status', response.status.toString(), 'text/plain');
        allure.attachment('Response Headers', JSON.stringify(response.headers), 'application/json');
        allure.attachment('Response Data', JSON.stringify(response.data, null, 2), 'application/json');
      });
    }

    return response;
  } catch (error) {
    handleGraphQLError(error);
  }
}

module.exports = { sendGraphQLMutation };
