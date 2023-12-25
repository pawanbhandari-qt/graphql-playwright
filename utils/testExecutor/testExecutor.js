// utils/testExecutor.js
import { sendGraphQLMutation } from '../graphqlClient/graphqlClient';
import { handleTestError } from '../errorHandling/errorHandling';

export const testExecutor = async (mutation, options) => {
  try {
    const response = await sendGraphQLMutation(mutation, {}, options);
    options.assertions(response);
  } catch (error) {
    handleTestError(error);
  }
};
