// setShippingMethodsOnCartMutation.js

export const setShippingMethodsOnCartMutation = (cartId, carrierCode, methodCode, shippingSelections) => `
mutation {
  setShippingMethodsOnCart(
    input: {
      cart_id: "${cartId}"
      shipping_methods: [
        {
          carrier_code: "${carrierCode}"
          method_code: "${methodCode}"
          shipping_selections: ["${shippingSelections}"]
        }
      ]
    }
  ) {
    cart {
      shipping_addresses {
        selected_shipping_method {
          carrier_title
          method_title
          carrier_code
          method_code
        }
      }
    }
  }
}
`;
