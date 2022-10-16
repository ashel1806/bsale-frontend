// alert("Script loaded successfully!");
import { getProducts } from "./api.js";
import Product from "./components/Product.js";

const productsContainer = document.querySelector("#products");
const searchForm = document.querySelector("#searchForm");

let filter = {};

async function fetchProducts() {
  const products = await getProducts(filter);
  console.log(products);
  productsContainer.innerHTML = products.map(Product).join("");
};

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  filter.search = e.target.search.value;
  fetchProducts();
});

const App = async () => {
  await fetchProducts();
}

App();