
const requests = {
  fetchProducts: (value) => `api/products?${value}`,
  fetchProduct: (value) => `api/products/${value}`,
  fetchFeatured: `api/products/featured`,
  fetchPaginated: `api/products/paginated`,
  searchProducts: `api/products/search`,
  fetchUser: (userId) => `api/user/${userId}`,
  addUser: (userId) => `api/user/add/${userId}`,
  addToCart: 'api/cart/add',
  removeFromCart: 'api/cart/remove',
  fetchCart: (userId) => `api/cart/fetch/${userId}`,
  placeOrder: (userId) => `api/order/placeorder/${userId}`,
  getOrder: (emailId) => `api/order/getorder/${emailId}`,
  toggleFavourite: `api/favourite/togglefavourite`,
  getFavourite: (userId) => `api/favourite/getfavourites/${userId}`,
}

export default requests;