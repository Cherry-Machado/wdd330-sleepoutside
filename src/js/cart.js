import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const cart = new ShoppingCart("so-cart", ".product-list");

loadHeaderFooter();
window.addEventListener("DOMContentLoaded", () => {
  cart.renderCartContents();
});
// cart.incdesQuantity();
// cart.deleteCartContent();
