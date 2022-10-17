import { getProductsData, getCategories } from "./api/index.js";

import Product from "./components/Product.js";
import Dropdown from "./components/Dropdown.js";
import Pagination from "./components/Pagination.js";

const productsContainer = document.querySelector("#products");
const searchForm = document.querySelector("#searchForm");
const categoriesDropdown = document.querySelector("#categories");
const itemsNumberDropdown = document.querySelector("#itemsNumber");
const totalProducts = document.querySelector("#totalProducts");
const paginationContainer = document.querySelector("#paginationContainer");

let filter = {};
let actualPage = 0;
let pagesCount = 0;

async function fetchProducts() {
  const { products, totalItems, totalPages, currentPage } = await getProductsData(filter);
  productsContainer.innerHTML = products.map(Product).join("");
  totalProducts.innerHTML = totalItems;
  console.log(totalPages, currentPage);
  actualPage = currentPage;
  pagesCount = totalPages;
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

  paginationContainer.innerHTML = Pagination(pagesCount, actualPage + 1);


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

  const paginationItemsContainer = document.querySelector(".pagination");
  console.log(paginationItemsContainer);
  const paginationItems = paginationItemsContainer.querySelectorAll(".page-item");
  console.log(paginationItems);

  paginationItems.forEach((item) => {
    +item.children[0].dataset.page === actualPage + 1 ? item.children[0].classList.add("active") : item.children[0].classList.remove("active");

    // console.log(+item.children[0].dataset.page === actualPage + 1)
    item.addEventListener("click", async (e) => {
      console.log(e.target)
      console.log(paginationItems);

      if (e.target.classList.contains("page-link")) {
        filter.page = e.target.dataset.page - 1;
        await fetchProducts();
      }
    });
  });
}

App();