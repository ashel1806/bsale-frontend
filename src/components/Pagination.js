const PaginationItem = (item, currentPage) => {
  console.log(item, currentPage);
  return `
    <li class="page-item">
      <span class="page-link" data-page=${item}>${item}</span>
    </li>
  `;
};

const Pagination = (totalPages, currentPage) => {
  const pages = new Array(totalPages).fill(0).map((_, idx) => idx + 1);
  // console.log(pages);

  return `
    <nav aria-label="Products page navigation">
      <ul class="pagination">
        ${pages.map((item) => PaginationItem(item, currentPage)).join("")}
      </ul>
    </nav>
  `
}


export default Pagination;