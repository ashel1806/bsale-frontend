const Product = (product) => {
  if (!product.url_image) {
    product.url_image =
      "https://melabiss.com/web/image/product.product/2483/image_1024";
  }

  let finalPrice = product.discount
    ? (product.price * (100 - product.discount)) / 100
    : product.price;

  return `
    <div class="col">
      <div class="card">
        <img src=${product.url_image} class="card-img-top" alt=${product.name}>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text ${product.discount ? 'text-decoration-line-through' : 'd-none'}">${product.price}</p>
          <p class="card-text">${finalPrice}</p>
        </div>
      </div>
    </div>
  `;
};

export default Product;
