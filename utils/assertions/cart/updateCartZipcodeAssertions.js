// updateCartZipcodeAssertions.js
import { updatedZipCode } from '../../../config/testData';
import { commonAssertions, assertCartItemProperties } from './assertions';
import { expect } from '@playwright/test';

export const assertUpdateCartZipcodeAssertions = (response) => {
  commonAssertions(response);

  const cart = response.data.data.updateCartZipcode.cart;

  expect(cart, 'Cart should exist').toBeDefined();
  expect(cart.id, 'Cart ID should exist').toBeDefined();
  expect(cart.shipping_addresses, 'Shipping addresses should exist').toBeDefined();
  expect(cart.shipping_addresses[0].postcode, 'Updated zip code should match').toBe(updatedZipCode);
  expect(cart.items, 'Items should exist').toBeDefined();

  // Assertions for each item in the cart
  for (const item of cart.items) {
    assertCartItemProperties(item);
  }  
};