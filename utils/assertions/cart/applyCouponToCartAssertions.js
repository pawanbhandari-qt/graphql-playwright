// updateCartItemsAssertions.js
import { assertCartItemProperties, commonAssertions } from './assertions';
import { expect } from '@playwright/test';
import {validCouponCode} from '../../../config/testData';

export const assertApplyCouponToCartAssertions = (response) => {
  commonAssertions(response);

  expect(response.data.data, "API response data should have applyCouponToCart property").toHaveProperty('applyCouponToCart');
  expect(response.data.data.applyCouponToCart, "applyCouponToCart property should have cart sub-property").toHaveProperty('cart');


  const cart = response.data.data.applyCouponToCart.cart;
  expect(cart, "Cart object should have an id property").toHaveProperty('id');
  expect(cart, "Cart object should have an applied_coupons property").toHaveProperty('applied_coupons');
  expect(cart, "Cart object should have an items property").toHaveProperty('items');

  // Assertions specific to applying a coupon
  expect(cart.applied_coupons, "Applied coupons should not be empty").not.toBeNull();
  expect(cart.applied_coupons[0].code, "Applied coupon code should match").toBe(validCouponCode);

  // Assertions for items in the cart
  expect(cart.items, "Cart should have items").not.toBeNull();
  expect(cart.items.length, "Cart should have at least one item").toBeGreaterThan(0);

  expect(Array.isArray(cart.items), "Cart items should be an array").toBe(true);

  // Loop through each item in the cart
  for (const cartItem of cart.items) {
    // Assert properties for each cart item (including product properties)
    assertCartItemProperties(cartItem);
  }

  // Assertions for prices
  const prices = cart.prices;

  expect(prices.grand_total, "Cart grand total should exist").not.toBeNull();
  expect(prices.grand_total.currency, "Currency should be USD").toBe("USD");
  expect(typeof prices.grand_total.value, "Grand total value should be a number").toBe("number");


  // Assertions for taxes
  expect(prices.applied_taxes, "Applied taxes should not be empty").not.toBeNull();
  expect(prices.applied_taxes.length, "Applied taxes should have at least one item").toBeGreaterThan(0);

  const appliedTax = prices.applied_taxes[0];
  expect(appliedTax.amount, "Tax amount should exist").not.toBeNull();
  expect(appliedTax.amount.currency, "Tax currency should be USD").toBe("USD");
  expect(typeof appliedTax.amount.value, "Tax value should be a number").toBe("number");
  expect(appliedTax.label, "Tax label should exist").toBeTruthy();

  // Assertions for discounts
  expect(prices.discounts, "Discounts should not be empty").not.toBeNull();
  expect(prices.discounts.length, "Discounts should have at least one item").toBeGreaterThan(0);

  const discount = prices.discounts[0];
  expect(discount.amount, "Discount amount should exist").not.toBeNull();
  expect(discount.amount.currency, "Discount currency should be USD").toBe("USD");
  expect(typeof discount.amount.value, "Discount value should be a number").toBe("number");
  expect(discount.label, "Discount label should exist").toBeTruthy();

  // Assertions for Subtotal Excluding Tax
  const subtotalExcludingTax = prices.subtotal_excluding_tax;
  expect(subtotalExcludingTax, "Subtotal Excluding Tax should exist").not.toBeNull();
  expect(subtotalExcludingTax.currency, "Subtotal Excluding Tax currency should be USD").toBe("USD");
  expect(typeof subtotalExcludingTax.value, "Subtotal Excluding Tax value should be a number").toBe("number");

  // Assertions for Subtotal Including Tax
  const subtotalIncludingTax = prices.subtotal_including_tax;
  expect(subtotalIncludingTax, "Subtotal Including Tax should exist").not.toBeNull();
  expect(subtotalIncludingTax.currency, "Subtotal Including Tax currency should be USD").toBe("USD");
  expect(typeof subtotalIncludingTax.value, "Subtotal Including Tax value should be a number").toBe("number");

  // Assertions for Subtotal with Discount Excluding Tax
  const subtotalWithDiscountExcludingTax = prices.subtotal_with_discount_excluding_tax;
  expect(subtotalWithDiscountExcludingTax, "Subtotal with Discount Excluding Tax should exist").not.toBeNull();
  expect(subtotalWithDiscountExcludingTax.currency, "Subtotal with Discount Excluding Tax currency should be USD").toBe("USD");
  expect(typeof subtotalWithDiscountExcludingTax.value, "Subtotal with Discount Excluding Tax value should be a number").toBe("number");
};