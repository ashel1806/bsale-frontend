/**
 * @param {Product} product - The product to be added to the card.
 * @returns {string} - The HTML string for the product card.
 */

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
    <div class="card h-100">
      <img src=${product.url_image} class="card-img-top product-image" alt=${product.name} />
      <div class="card-body">
        <span class="badge rounded-pill text-bg-info text-capitalize mb-3">${product.type.name}</span>
        <h5 class="mb-0 text-capitalize">${product.name}</h5>

        <div class="d-flex my-3">
          <p class="small me-2 ${product.discount ? 'text-danger' : 'd-none'}">
            <s>$ ${product.price}</s>
          </p>
          <h5 class="text-dark mb-0 fw-light">$ ${finalPrice}</h5>
        </div>
      </div>
    </div>
  </div>
  `;
};

export default Product;

/**
 * @typedef {Object} Category
 * @property {string} name
 */

/**
 * @typedef {Object} Product
 * @property {string} name
 * @property {string} url_image
 * @property {number} price
 * @property {number} discount
 * @property {Category} type
 */