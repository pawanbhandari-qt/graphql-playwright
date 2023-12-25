// updateCartItemsAssertions.js
import { assertCartItemProperties, commonAssertions } from './assertions';
import { expect } from '@playwright/test';
import {updatedItemQuantity} from '../../../config/testData';

export const assertUpdateCartItems = (response) => {
  commonAssertions(response);
  expect(response.data.data, "API response data should have updateCartItems property").toHaveProperty('updateCartItems');
  expect(response.data.data.updateCartItems, "updateCartItems property should have cart sub-property").toHaveProperty('cart');
  const updatedCart = response.data.data.updateCartItems.cart;
  expect(updatedCart, "Cart object should have an id property").toHaveProperty('id');
  expect(updatedCart, "Cart object should have an items property").toHaveProperty('items');
  
  const updatedCartItem = updatedCart.items[0];

  expect(updatedCartItem.id, 'updated Cart ItemId should be defined').toBeDefined();
  expect(updatedCartItem.quantity, `updated Cart Item quantity should be ${updatedItemQuantity}`).toEqual(parseInt(updatedItemQuantity));
  expect(Array.isArray(updatedCart.items), "Cart items should be an array").toBe(true);
  // Loop through each item in the cart
  for (const cartItem of updatedCart.items) {
    // Assert properties for each cart item (including product properties)
    assertCartItemProperties(cartItem);
  }
};