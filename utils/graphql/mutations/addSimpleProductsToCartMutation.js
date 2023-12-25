import { testZipCode } from "../../../config/testData";

export const addSimpleProductsToCartMutation = (cartId,sku) => `
mutation {
  addSimpleProductsToCart(
    input: {
      cart_id: "${cartId}"
      cart_items: [
        {
          data: {
            quantity: 1
            sku: "${sku}"
          }
        }
      ],
      zip: "${testZipCode}"
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
