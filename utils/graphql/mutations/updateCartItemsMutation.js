// updateCartItemsMutation.js
import { updatedItemQuantity } from "../../../config/testData";

export const updateCartItemsMutation = (cartId,cartItemId) => `
mutation {
    updateCartItems(input: {
      cart_id: "${cartId}"
      cart_items: [
        {
          cart_item_id: ${cartItemId}
          quantity: ${updatedItemQuantity}
        }
      ]
    }){
      cart {
      id
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
