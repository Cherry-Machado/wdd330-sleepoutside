import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices();

const productList = document.querySelector(".product-list");
const productListning = new ProductList(category, dataSource, productList);

document.querySelector("#current-category").textContent = category;

productListning.init();
