import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  // const price = cartItems.map((item) => cartTotal(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function cartTotal(item){
    const cartItems = getLocalStorage("so-cart")

    if (cartItems) {
      let total = 0;

      cartItems.forEach(item => {
        total += item.FinalPrice
        // total += item.FinalPrice * item.Quantity
      });

      document.getElementById("cart-total").textContent = total.toFixed(2);
    }
    else {
      document.getElementById("cart-total").textContent = "0.00";
    }

}
renderCartContents();
cartTotal();
