// assertions.js

import { expect } from '@playwright/test';
import { getExpectedCartItemProperties, getExpectedProductProperties } from '../../../config/testData';

export const commonAssertions = (response) => {
  expect(response.status, "API response status should be 200").toBe(200);
  expect(response.statusText, `API response statusText should be "OK"`).toBe('OK');
  expect(response.data, "API response should have a data property").toHaveProperty('data');
};

export const assertCartItemProperties = (cartItem) => {
  const expectedCartItemProperties = getExpectedCartItemProperties(cartItem.product.sku);
  const expectedProductProperties = getExpectedProductProperties(cartItem.product.sku);

  // Assert properties for each cart item
  Object.entries(expectedCartItemProperties).forEach(([property, value]) => {
    expect(cartItem, `CartItem should have ${property} property with value ${value}`).toHaveProperty(property, value);
  });

  // Assert properties for the product in each cart item
  Object.entries(expectedProductProperties).forEach(([property, value]) => {
    expect(cartItem.product, `Product should have ${property} property with value ${value}`).toHaveProperty(property, value);
  });

  // Additional assertion for estimated_delivery_time based on is_innovel_item
  if (expectedProductProperties.is_innovel_item) {
    expect(cartItem, 'For innovel item, estimated_delivery_time should have a valid date').toHaveProperty(
      'estimated_delivery_time',
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    );
  } else {
    // Fix the path to include the 'product' object
    expect(cartItem, 'For non-innovel item, estimated_delivery_time should be an empty string').toHaveProperty(
      'estimated_delivery_time',
      ''
    );
  }
};

export const assertProductProperties = (product) => {
  const expectedProductProperties = getExpectedProductProperties(product.sku);

  // Assert properties for the product
  Object.entries(expectedProductProperties).forEach(([property, value]) => {
    expect(product, `Product should have ${property} property with value ${value}`).toHaveProperty(property, value);
  });
};
