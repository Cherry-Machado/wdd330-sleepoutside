import { getLocalStorage, setLocalStorage, priceTotal} from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card dividerr">
    <a href="#" class="cart-card_image">
        <img
            src="${item.Image}"
            alt="${item.Name}"
        />
    </a>
    <a href="#">
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">${item.Quantity}</p>
    <p class="cart-card__price">${item.FinalPrice}</p>
    </li>`;

    return newItem
}

export default class ShoppingCart {
    constructor(key, parentSelector){
        this.key = key;
        this.parentSelector = parentSelector;
    }
    renderCartContents() {
        const cartItems = getLocalStorage("so-cart") || [];
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
         document.querySelector(".product-list").innerHTML = htmlItems.join("");
     }

    
    renderCartContents() {
        const cartItems = getLocalStorage("so-cart");
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        const total = priceTotal(cartItems, (item) => item.FinalPrice * item.quantity,
    );
    document.querySelector(".cart-total__amount").textContent = total;
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    document.querySelectorAll(".cart-card__delete").forEach((button) => {
    button.addEventListener("click", deleteCartContent);
    });
}

cartTotal(){
    item.FinalPrice
}

// deleteCartContent(event) {
//   const itemId = event.target.getAttribute("data-id");
//   let cartItems = getLocalStorage("so-cart");

//   const itemIndex = cartItems.findIndex((item) => item.Id === itemId);
//   cartItems[itemIndex].quantity -= 1;

//   if (cartItems[itemIndex].quantity <= 0) {
//     cartItems = cartItems.filter((item) => item.Id !== itemId);
//   }

//   setLocalStorage("so-cart", cartItems);
//   renderCartContents();
// }
}