// createEmptyCartAssertions.js
import { commonAssertions } from './assertions';
import { expect } from '@playwright/test';

export const assertCreateEmptyCartAssertions = (response) => {
  commonAssertions(response);
  expect(response.data.data, "API response should have createEmptyCart property in data object").toHaveProperty('createEmptyCart');
  expect(typeof response.data.data.createEmptyCart, "createEmptyCart property in data object should be a string").toBe('string');
};