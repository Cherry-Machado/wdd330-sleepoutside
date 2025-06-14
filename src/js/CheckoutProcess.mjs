import ExternalServices from "./ExternalServices.mjs";
import {getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts} from "./utils.mjs";

const externalServices = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map((item) => ({
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1
  }));
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = this.key;
        this.outputSelector = outputSelector;
        this.list = []
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        this.itemTotal = this.list.reduce((acc, item) => {
            return acc + item.FinalPrice * item.Quantity;
            }, 0);
    }

    calculateOrderTotal() {
        this.tax = this.itemTotal * 0.06;
        this.shipping = this.list.length * 10 + 2;
        this.orderTotal = this.itemTotal + this.tax + this.shipping;

        this.displayOrderTotals()    
    }

    displayOrderTotals(){
        const subtotal = document.querySelector("#cart_subtotal");
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotalElement = document.querySelector(`${this.outputSelector} #ordertotal`);

        subtotal.innerText =`$${this.itemTotal.toFixed(2)}`;
        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
    }

    async checkout(form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
      const formElement = document.forms["checkout"];

      const json = formDataToJSON(formElement);
      // add totals, and item details
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      console.log(json);
      try {
        const res = await externalServices.checkout(json);
        console.log(res);
        setLocalStorage("so-cart", []);
        location.assign("/checkout/success.html");
      } catch (err) {
        // get rid of any preexisting alerts.
        removeAllAlerts();
        for (let message in err.message) {
          alertMessage(err.message[message]);
      }
  
      console.log(err);
    // call the checkout method in our ExternalServices module and send it our data object.

  }
  }

}
