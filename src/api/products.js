import BACKEND_URL from "../config.js";

/**
 * Function to get the products data from the API
 *
 * @param {QueryParams} - Object with the query params to be used in the request.
 * @returns {DataResponse} - Object with the data from the API.
 */
export const getProductsData = async ({
  search = '',
  page = 0,
  limit = 10,
  category = '',
} = {}) => {
  let query = '?';
  if (search) query += `search=${search}&`;
  if (page) query += `page=${page}&`;
  if (limit) query += `limit=${limit}&`;
  if (category) query += `category=${category}&`;


  const response = await fetch(`${BACKEND_URL}/products/${query}`);
  const data = await response.json();
  // console.log(products);

  return data;
}

/**
 * @typedef {Object} QueryParams
 * @property {string} search
 * @property {number} page
 * @property {number} limit
 * @property {string} category
 */

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

/**
 * @typedef {Object} DataResponse
 * @property {number} totalItems
 * @property {Product[]} products
 * @property {number} totalPages
 * @property {number} currentPage
 */