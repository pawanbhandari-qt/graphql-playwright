// updateCartZipcodeMutation.js

export const updateCartZipcodeMutation = (cartId, updatedZipCode) => `
mutation {
  updateCartZipcode(
    input: {
      cart_id: "${cartId}"
      zipcode: "${updatedZipCode}"
    }
  ) {
    cart {
    id
    shipping_addresses {
      postcode
    }
    items {
      id
      group_id
      is_dynamic_scheduling
      estimated_delivery_time
      selected_date
      quantity
      shippingRates {
        method_title
        identifier
        carrier
        method
      }
      product {
        is_innovel_item
        sku
        erp_type
        subscription_enable
      }
    }
  }
}
}
`;
