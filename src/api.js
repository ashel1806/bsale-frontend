const BACKEND_URL = 'http://localhost:3001/api';

export const getProducts = async () => {
  const response = await fetch(`${BACKEND_URL}/products`);
  const products = await response.json();

  return products;
}