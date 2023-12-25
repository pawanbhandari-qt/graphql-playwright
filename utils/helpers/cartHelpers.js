// utils/cartHelpers.js
import { sendGraphQLMutation } from '../graphqlClient/graphqlClient';
import { addSimpleProductsToCartMutation, applyCouponToCartMutation, createEmptyCartMutation, getCartItemDetailQuery, updateCartZipcodeMutation, } from '../graphql/graphql';

export async function createEmptyCart() {
  const createCartResponse = await sendGraphQLMutation(createEmptyCartMutation, {}, {
    allure: false,
    file: false,
    testName: '',
  });
  return createCartResponse.data.data.createEmptyCart;
}

export async function addProductToCart(cartId, sku) {
  const addProductResponse = await sendGraphQLMutation(addSimpleProductsToCartMutation(cartId, sku), {}, {
    allure: false,
    file: false,
    testName: '',
  });
  return addProductResponse.data.data.addSimpleProductsToCart.cart.items[0].id;
}


export async function applyCouponToCart(cartId) {
  const applyCouponResponse = await sendGraphQLMutation(applyCouponToCartMutation(cartId), {}, {
    allure: false,
    file: false,
    testName: '',
  });
  return applyCouponResponse.data.data.applyCouponToCart.cart.applied_coupons[0].code;
}


export async function updateCartZipcode(cartId,zipcode) {
  const updateCartZipcodeResponse = await sendGraphQLMutation(updateCartZipcodeMutation(cartId, zipcode), {}, {
    allure: false,
    file: false,
    testName: '',
  });
  return updateCartZipcodeResponse.data.data.updateCartZipcode.cart;
}



export async function getCartItemDetails(cartId) {
  const getCartItemDetailResponse = await sendGraphQLMutation(getCartItemDetailQuery(cartId), {}, {
    allure: false,
    file: false,
    testName: '',
  });
  return getCartItemDetailResponse.data.data.cart.items[0].shippingRates;
}