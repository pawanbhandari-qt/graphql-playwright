// removeCouponFromCartAssertions.js
import { assertCartItemProperties, commonAssertions } from './assertions';
import { expect } from '@playwright/test';

export const assertRemoveCouponFromCartAssertions = (response) => {
  commonAssertions(response);

  expect(response.data.data, "API response data should have removeCouponFromCart property").toHaveProperty('removeCouponFromCart');
  expect(response.data.data.removeCouponFromCart, "removeCouponFromCart property should have cart sub-property").toHaveProperty('cart');


  const cart = response.data.data.removeCouponFromCart.cart;
  expect(cart, "Cart object should have an id property").toHaveProperty('id');
  expect(cart, "Cart object should have an applied_coupons property").toHaveProperty('applied_coupons');
  expect(cart, "Cart object should have an items property").toHaveProperty('items');

  expect(cart, 'Cart should exist').toBeDefined();
  expect(cart.id, 'Cart ID should exist').toBeDefined();
  expect(cart.applied_coupons, 'Applied coupons should be null').toBeNull();
  expect(cart.items, 'Items should exist').toBeDefined();
  expect(cart.prices, 'Prices should exist').toBeDefined();

  // Assertions for each item in the cart
  for (const item of cart.items) {
    assertCartItemProperties(item);
  }

  // Assertions for prices
  const prices  = cart.prices;
  expect(prices.grand_total, 'Grand total should exist').toBeDefined();
  expect(prices.grand_total.currency, 'Currency should be USD').toBe('USD');
  expect(typeof prices.grand_total.value, 'Grand total value should be a number').toBe('number');

  expect(prices.applied_taxes, 'Applied taxes should exist').not.toBeNull();
  // Add more assertions for other price properties if needed
};
