import { getProductsData, getCategories } from "./api/index.js";

import Product from "./components/Product.js";
import Dropdown from "./components/Dropdown.js";

const productsContainer = document.querySelector("#products");
const searchForm = document.querySelector("#searchForm");
const categoriesDropdown = document.querySelector("#categories");
const itemsNumberDropdown = document.querySelector("#itemsNumber");
const totalProducts = document.querySelector("#totalProducts");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");

let filter = {};

async function fetchProducts() {
  const { products, totalItems, totalPages, currentPage } = await getProductsData(filter);
  productsContainer.innerHTML = products.map(Product).join("");
  totalProducts.innerHTML = `Mostrando ${filter.limit || 10} de ${totalItems} productos`;
  filter.page = currentPage;

  if (currentPage + 1 === 1) {
    prevButton.classList.add("disabled");
  } else {
    prevButton.classList.remove("disabled");
  }

  if (currentPage + 1 === totalPages) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
};


async function fetchCategories() {
  const categories = await getCategories();
  categoriesDropdown.innerHTML = Dropdown(categories, "category");
}

const itemsNumberArray = [
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
]

itemsNumberDropdown.innerHTML = Dropdown(itemsNumberArray, "limit");

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

App();