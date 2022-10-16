import { capitalize } from './util.js';

const BACKEND_URL = 'https://bsale-backend.onrender.com/api';

export const getProducts = async ({
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
  const { products } = await response.json();
  // console.log(products);

  return products;
}

export const getCategories = async () => {
  const response = await fetch(`${BACKEND_URL}/categories`);
  const categories = await response.json();

  categories.forEach((category) => {
    category.value = category.name;
    category.label = capitalize(category.name);

    delete category.name;
  });

  categories.unshift({ label: 'Todas', value: '' });

  return categories;
}