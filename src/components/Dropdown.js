/**
 *
 * @param {DropdownItem} item The item to be added to the dropdown
 * @param {string} dataset The dataset to be used for the dropdown item.
 */
const DropdownItem = (item, dataset) => {
  return `
    <li class="dropdown-item" data-${dataset}=${item.value} >
      ${item.label}
    </li>
  `
};

/**
 * @param {string} title The title of the dropdown
 * @param {DropdownItem[]} items Items to be displayed in the dropdown.
 * @param {string} dataset The dataset to be used for the dropdown items.
 */
const Dropdown = (title, items, dataset) => {
  return `
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        ${title}
      </button>
      <ul class="dropdown-menu">
        ${items.map((item) => DropdownItem(item, dataset)).join("")}
      </ul>
    </div>
  `
}


export default Dropdown;

/**
 * @typedef {Object} DropdownItem
 * @property {string} label
 * @property {string} value
 */