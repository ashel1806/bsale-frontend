import { getProductsData, getCategories } from "./api/index.js";

import Product from "./components/Product.js";
import Dropdown from "./components/Dropdown.js";

// DOM elements
const productsContainer = document.querySelector("#products");
const searchForm = document.querySelector("#searchForm");
const categoriesDropdown = document.querySelector("#categories");
const itemsNumberDropdown = document.querySelector("#itemsNumber");
const totalProducts = document.querySelector("#totalProducts");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

// Filter object to be used in the API request
let filter = {};

// Function to fetch the products from the API
async function fetchProducts() {
  const { products, totalItems, totalPages, currentPage } = await getProductsData(filter);

  // If there are no products, show a message to the user
  if (!products.length) {
    productsContainer.innerHTML = `<h3>No se encontraron productos</h3>`;
    nextButton.classList.add("d-none");
    prevButton.classList.add("d-none");
    return;
  }

  // Render the products
  productsContainer.innerHTML = products.map(Product).join("");
  totalProducts.innerHTML = `Mostrando ${filter.limit || 10} de ${totalItems} productos`;
  filter.page = currentPage;

  // Disable the prev button if the current page is 1
  if (currentPage + 1 === 1) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  // Disable the next button if the current page is the last page
  if (currentPage + 1 === totalPages) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }

  // Show the prev and next buttons if there are products
  nextButton.classList.remove("d-none");
  prevButton.classList.remove("d-none");
};


// Function to fetch the categories from the API
async function fetchCategories() {
  const categories = await getCategories();
  categoriesDropdown.innerHTML = Dropdown(categories, "category");
}

// Array of items to be used in the dropdowns
const itemsNumberArray = [
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
]

itemsNumberDropdown.innerHTML = Dropdown(itemsNumberArray, "limit");

// Main function to be executed when the page loads
const App = async () => {
  await fetchProducts();
  await fetchCategories();

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    filter.search = e.target.search.value;
    fetchProducts();
  });

  categoriesDropdown.addEventListener("click", async (e) => {
    if (e.target.classList.contains("dropdown-item")) {
      filter.category = e.target.dataset.category;
      const itemParent = e.target.parentElement;
      const button = itemParent.parentElement.children[0];
      button.textContent = e.target.textContent;
      fetchProducts();
    }
  });

  itemsNumberDropdown.addEventListener("click", async (e) => {
    if (e.target.classList.contains("dropdown-item")) {
      filter.limit = e.target.dataset.limit;
      const itemParent = e.target.parentElement;
      const button = itemParent.parentElement.children[0];
      button.textContent = e.target.textContent;
      fetchProducts();
    }
  });

  prevButton.addEventListener("click", async () => {
    filter.page--;
    await fetchProducts();
  });

  nextButton.addEventListener("click", async () => {
    filter.page++;
    await fetchProducts();
  });
}

// Execute the main function
window.addEventListener("load", App);