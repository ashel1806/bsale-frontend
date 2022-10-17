import BACKEND_URL from '../config.js';
import { capitalize } from '../util.js';

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