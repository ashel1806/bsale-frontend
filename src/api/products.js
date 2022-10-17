import BACKEND_URL from "../config.js";

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