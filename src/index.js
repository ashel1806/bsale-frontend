// alert("Script loaded successfully!");
import { getProducts, getCategories } from "./api.js";
import Product from "./components/Product.js";
import Dropdown from "./components/Dropdown.js";

const productsContainer = document.querySelector("#products");
const searchForm = document.querySelector("#searchForm");
const categoriesDropdown = document.querySelector("#categories");
const itemsNumberDropdown = document.querySelector("#itemsNumber");

let filter = {};

async function fetchProducts() {
  const products = await getProducts(filter);
  productsContainer.innerHTML = products.map(Product).join("");
};

async function fetchCategories() {
  const categories = await getCategories();
  categoriesDropdown.innerHTML = Dropdown("Categorias", categories, "category");
}

const itemsNumberArray = [
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
]

itemsNumberDropdown.innerHTML = Dropdown("Items por página", itemsNumberArray, "limit");

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
      fetchProducts();
    }
  });

  itemsNumberDropdown.addEventListener("click", async (e) => {
    if (e.target.classList.contains("dropdown-item")) {
      filter.limit = e.target.dataset.limit;
      fetchProducts();
    }
  });
}

App();