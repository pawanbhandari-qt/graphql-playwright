export const removeItemFromCartMutation = (cartId,cartItemId) => `
mutation {
  removeItemFromCart(input: { cart_id: "${cartId}", cart_item_id: ${cartItemId} }) 
  {
    cart {
    id
    items {
      id
      product {
        sku
      }
    }
  }
}
}
`;