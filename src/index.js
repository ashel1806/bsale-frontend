// alert("Script loaded successfully!");
import { getProducts } from "./api.js";
import Product from "./components/Product.js";

const productsContainer = document.querySelector(".products");

const App = async () => {
  const products = await getProducts();

  productsContainer.innerHTML = `${products.map((product) => Product(product)).join("")}`;
}

App();