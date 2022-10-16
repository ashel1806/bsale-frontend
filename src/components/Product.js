const Product = (product) => {
  return `
    <div class="product">
      <h2>Product</h2>
      <p>${product.name}</p>
      <p>${product.price}</p>
      <p>${product.discount}</p>
      <img src="${product.url_image}" alt="${product.name}" />
    </div>
  `
}

export default Product;