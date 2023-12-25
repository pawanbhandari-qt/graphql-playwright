export const getCartItemDetailQuery = (cartId) => `
query {
  cart(cart_id: "${cartId}") {
    id
    email
    total_quantity
    shipping_addresses {
      firstname
      lastname
      postcode
      street
      city
      region {
        label
      }
    }
    items {
      id
      shippable
      warehouse_code
      haul_away_available
      installation_available
      available_dates
      item_stock {
        qty
        status
      }
      status {
        code
        detail {
          product {
            erpType
          }
        }
      }
      group_id
      is_dynamic_scheduling
      estimated_delivery_time
      selected_date
      quantity
      service_parent_item_id
      service_child_items {
        service_type
        child_item_id
      }
      billing_period {
        id
        intervalLabel
        intervalType
        numberOfInterval
      }
      shippingRates {
        method_title
        identifier
        carrier
        method
        from_day
        to_day
        price
        selected
        est_shipping_date
        est_shipping_text
        cutofftime
      }
      product {
        model_name
        parent_product_categories {
          id
          name
        }
        id
        contract_term_month
        is_innovel_item
        name
        sku
        pdp_url
        model_id
        min_sale_qty
        max_sale_qty
        stock_status
        quantity
        erp_type
        has_accessories
        handy_enable
        esp_enable
        haulaway_service_enable
        installation_service_enable
        subscription_enable
        subscription_price
        subscription_only
        subscription_discount
        subscription_final_price
        subscription_additional_discount
        define_start_from
        day_of_month
        discount_type
        msrp
        preorder_enabled
        refurbished_enabled
        accessory_products {
          sku
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
      }
    }
  }
}
`;
