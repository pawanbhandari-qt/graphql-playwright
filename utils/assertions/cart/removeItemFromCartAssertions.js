// removeItemFromCartAssertions.js
import { allure } from 'allure-playwright';
import { commonAssertions } from './assertions';
import { expect } from '@playwright/test';

export const assertRemoveItemFromCartAssertions = (response) => {
        commonAssertions(response);
        // Assert that the response contains the 'data' property
        expect(response.data, "API response should have 'data' property").toHaveProperty('data');
        // Assert that the 'data' property contains the 'removeItemFromCart' property
        expect(response.data.data, "API response data should have 'removeItemFromCart' property").toHaveProperty('removeItemFromCart');
        // Assert that the 'removeItemFromCart' property contains the 'cart' property
        expect(response.data.data.removeItemFromCart, "API response removeItemFromCart should have 'cart' property").toHaveProperty('cart');
        // Assert that the 'cart' property contains the 'id' property
        expect(response.data.data.removeItemFromCart.cart, "API response cart should have 'id' property").toHaveProperty('id');
        // Assert that the 'cart' property contains the 'items' property
        expect(response.data.data.removeItemFromCart.cart, "API response cart should have 'items' property").toHaveProperty('items');
        // Assert that the 'items' property is an array
        expect(response.data.data.removeItemFromCart.cart.items, "API response cart items should be an array").toBeInstanceOf(Array);
        // Assert that the 'items' array is empty (since you removed the only item added)
        expect(response.data.data.removeItemFromCart.cart.items, "API response cart items should be empty").toHaveLength(0);
};