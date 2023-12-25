// removeCouponFromCartMutation.js

export const removeCouponFromCartMutation = (cartId) => `
mutation {
  removeCouponFromCart(input: { cart_id: "${cartId}" }) {
    cart {
      id
      applied_coupons {
        code
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
      prices {
        grand_total {
          currency
          value
        }
        additional_discounts {
          amount {
            currency
            value
          }
          label
        }
        applied_taxes {
          amount {
            currency
            value
          }
          label
        }
        discounts {
          amount {
            currency
            value
          }
          label
        }
        subtotal_excluding_tax {
          currency
          value
        }
        subtotal_including_tax {
          currency
          value
        }
        subtotal_with_discount_excluding_tax {
          currency
          value
        }
      }
    }
  }
}
`;
