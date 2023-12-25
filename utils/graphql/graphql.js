// graphql.js
import { createEmptyCartMutation } from './mutations/createEmptyCartMutation';
import { addSimpleProductsToCartMutation } from './mutations/addSimpleProductsToCartMutation';
import { removeItemFromCartMutation } from './mutations/removeItemFromCartMutation';
import { updateCartItemsMutation } from './mutations/updateCartItemsMutation';
import { applyCouponToCartMutation } from './mutations/applyCouponToCartMutation';
import { removeCouponFromCartMutation } from './mutations/removeCouponFromCartMutation';
import { updateCartZipcodeMutation } from './mutations/updateCartZipcodeMutation';
import { setShippingMethodsOnCartMutation } from './mutations/setShippingMethodsOnCartMutation';
import { getCartItemDetailQuery } from './queries/getCartItemDetailQuery';

export {
  createEmptyCartMutation,
  addSimpleProductsToCartMutation,
  removeItemFromCartMutation,
  updateCartItemsMutation,
  applyCouponToCartMutation,
  removeCouponFromCartMutation,
  updateCartZipcodeMutation,
  setShippingMethodsOnCartMutation,
  getCartItemDetailQuery
};
