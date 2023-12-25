// addSimpleProductsToCartAssertions.js
import { assertCartItemProperties, commonAssertions } from './assertions';
import { expect } from '@playwright/test';

export const assertAddSimpleProductsToCartMutation = (response) => {
    commonAssertions(response);
    expect(response.data.data, "API response data should have addSimpleProductsToCart property").toHaveProperty('addSimpleProductsToCart');
    expect(response.data.data.addSimpleProductsToCart, "addSimpleProductsToCart property should have cart sub-property").toHaveProperty('cart');
    const cart = response.data.data.addSimpleProductsToCart.cart;
    expect(cart, "Cart object should have an id property").toHaveProperty('id');
    expect(cart, "Cart object should have an items property").toHaveProperty('items');
    expect(Array.isArray(cart.items), "Cart items should be an array").toBe(true);
    // Loop through each item in the cart
    for (const cartItem of cart.items) {
      // Assert properties for each cart item (including product properties)
      assertCartItemProperties(cartItem);
    }
};