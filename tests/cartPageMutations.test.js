// tests/cartPageMutations.test.js
import { test } from '@playwright/test';
import { testExecutor } from '../utils/testExecutor/testExecutor';
import { productDetails, testZipCode, updatedZipCode } from '../config/testData';
import { assertCreateEmptyCartAssertions } from '../utils/assertions/cart/createEmptyCartAssertions';
import { assertAddSimpleProductsToCartMutation } from '../utils/assertions/cart/addSimpleProductsToCartAssertions';
import { assertRemoveItemFromCartAssertions } from '../utils/assertions/cart/removeItemFromCartAssertions';
import { assertUpdateCartItems } from '../utils/assertions/cart/updateCartItemsAssertions';
import { assertApplyCouponToCartAssertions } from '../utils/assertions/cart/applyCouponToCartAssertions';
import { assertRemoveCouponFromCartAssertions } from '../utils/assertions/cart/removeCouponFromCartAssertions';
import { assertUpdateCartZipcodeAssertions } from '../utils/assertions/cart/updateCartZipcodeAssertions';
import { assertSetShippingMethodsOnCartAssertions } from '../utils/assertions/cart/setShippingMethodsOnCartAssertions';
import { createEmptyCart, addProductToCart, applyCouponToCart, updateCartZipcode, getCartItemDetails } from '../utils/helpers/cartHelpers';
import {
  createEmptyCartMutation,
  addSimpleProductsToCartMutation,
  removeItemFromCartMutation,
  updateCartItemsMutation,
  applyCouponToCartMutation,
  removeCouponFromCartMutation,
  updateCartZipcodeMutation,
  setShippingMethodsOnCartMutation
} from '../utils/graphql/graphql';

test('should create an empty cart using GraphQL mutation', async () => {
  await testExecutor(createEmptyCartMutation, {
    testName: 'Create Empty Cart - GraphQL Mutation',
    assertions: assertCreateEmptyCartAssertions,
  });
});

for (const sku of Object.keys(productDetails)) {
  test(`should add ${productDetails[sku].type} products to cart using GraphQL mutation`, async () => {
    const newCartId = await createEmptyCart();
    await testExecutor(addSimpleProductsToCartMutation(newCartId, sku), {
      testName: `Add Product to Cart - GraphQL Mutation - (${productDetails[sku].type})`,
      assertions: assertAddSimpleProductsToCartMutation,
    });
  });
}

for (const sku of Object.keys(productDetails)) {
  test(`should remove ${productDetails[sku].type} item from cart using GraphQL mutation`, async () => {
    const newCartId = await createEmptyCart();
    const newItemId = await addProductToCart(newCartId, sku);
    await testExecutor(removeItemFromCartMutation(newCartId, newItemId), {
      testName: `Remove Item from Cart - GraphQL Mutation - (${productDetails[sku].type})`,
      assertions: assertRemoveItemFromCartAssertions,
    });
  });
}

for (const sku of Object.keys(productDetails)) {
  test(`should update cart items for ${productDetails[sku].type} using GraphQL mutation`, async () => {
    const newCartId = await createEmptyCart();
    const newItemId = await addProductToCart(newCartId, sku);
    await testExecutor(updateCartItemsMutation(newCartId, newItemId), {
      testName: `Update Cart Items - GraphQL Mutation - ${productDetails[sku].type}`,
      assertions: assertUpdateCartItems,
    });
  });
}

for (const sku of Object.keys(productDetails)) {
  test(`should apply coupon to cart for ${productDetails[sku].type} using GraphQL mutation`, async () => {
    const newCartId = await createEmptyCart();
    await addProductToCart(newCartId, sku);
    await testExecutor(applyCouponToCartMutation(newCartId), {
      testName: `Apply Coupon to Cart - GraphQL Mutation - ${productDetails[sku].type}`,
      assertions: assertApplyCouponToCartAssertions,
    });
  });
}

for (const sku of Object.keys(productDetails)) {
  test(`should remove coupon from cart for ${productDetails[sku].type} using GraphQL mutation`, async () => {
    const newCartId = await createEmptyCart();
    await addProductToCart(newCartId, sku);
    await applyCouponToCart(newCartId);
    await testExecutor(removeCouponFromCartMutation(newCartId), {
      testName: `Remove Coupon from Cart - GraphQL Mutation - ${productDetails[sku].type}`,
      assertions: assertRemoveCouponFromCartAssertions,
    });
  });
}

for (const sku of Object.keys(productDetails)) {
  test(`should update cart zipcode for ${productDetails[sku].type} using GraphQL mutation`, async () => {
    const newCartId = await createEmptyCart();
    await addProductToCart(newCartId, sku);
    await testExecutor(updateCartZipcodeMutation(newCartId, updatedZipCode), {
      testName: `Update Cart Zipcode - GraphQL Mutation - ${productDetails[sku].type}`,
      assertions: assertUpdateCartZipcodeAssertions,
    });
  });
}

for (const sku of Object.keys(productDetails)) {
  test(`should set shipping method on cart for ${productDetails[sku].type}`, async () => {
    const newCartId = await createEmptyCart();
    await addProductToCart(newCartId, sku);
    await updateCartZipcode(newCartId, testZipCode);
    const cartItemDetails = await getCartItemDetails(newCartId);

    for (const cartItemDetail of cartItemDetails) {
      await testExecutor(setShippingMethodsOnCartMutation(newCartId, cartItemDetail.carrier, cartItemDetail.method, cartItemDetail.identifier), {
        testName: `Set Shipping method [${cartItemDetail.method}] on cart - GraphQL Mutation - ${productDetails[sku].type}`,
        assertions: assertSetShippingMethodsOnCartAssertions,
      });
    }
  });
}