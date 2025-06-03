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
    <button class="decrease">-</button>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <button class="increase">+</button>
    <button class="cart-card__delete" data-id="${item.Id}">Eliminar</button>
    <p class="cart-card__price">${item.FinalPrice}</p>
    </li>`;

    return newItem
}

export default class ShoppingCart {
    constructor(key, parentSelector){
        this.key = key;
        this.parentSelector = parentSelector;
    }
    // renderCartContents() {
    //     const cartItems = getLocalStorage("so-cart") || [];
    //     const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    //      document.querySelector(".product-list").innerHTML = htmlItems.join("");
    //  }

    
    renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    const total = priceTotal(cartItems, (item) => item.FinalPrice * item.quantity);

        document.querySelector(".cart-total__amount").textContent = total;
        document.querySelector(".product-list").innerHTML = htmlItems.join("");

        // + and - Button
        document.querySelectorAll(".cart-card").forEach((itemElement, index) => {
            const item = cartItems[index]; 
            const quantityEl = itemElement.querySelector(".cart-card__quantity");
            const increaseBtn = itemElement.querySelector(".increase");
            const decreaseBtn = itemElement.querySelector(".decrease");

         
            increaseBtn.addEventListener("click", () => {
                item.quantity++;
                quantityEl.textContent = item.quantity;
                setLocalStorage("so-cart", cartItems);
                this.renderCartContents();
            });

            decreaseBtn.addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    quantityEl.textContent = item.quantity;
                    setLocalStorage("so-cart", cartItems);
                    this.renderCartContents();
                }
            });


            });
            document.querySelectorAll(".cart-card__delete").forEach((button) => {
            button.addEventListener("click", this.deleteCartContent.bind(this));
        });

    }
     deleteCartContent(event) {
     console.log("Botón eliminar clickeado"); 
    const itemId = event.target.getAttribute("data-id");
    let cartItems = getLocalStorage("so-cart");

    const itemIndex = cartItems.findIndex((item) => item.Id === itemId);

    if (itemIndex === -1) return;

    cartItems.splice(itemIndex, 1); // Elimina el producto completamente

    setLocalStorage("so-cart", cartItems);
    this.renderCartContents();
}
}


