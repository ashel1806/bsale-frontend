// const BACKEND_URL = 'https://bsale-backend.onrender.com/api';

export const getProducts = async () => {
  const response = await fetch(`${BACKEND_URL}/products`);
  const { products } = await response.json();
  console.log(products);

  return products;
}