import { g as u, a as s, l as h, s as d, r as p } from "./utils-CpYJUKXc.js";
import { E as m } from "./ExternalServices-BOkwevmt.js";
class x {
  constructor(e, t) {
    (this.key = e),
      (this.outputSelector = t),
      (this.subtotal = 0),
      (this.shipping = 0),
      (this.tax = 0),
      (this.total = 0),
      (this.list = []),
      (this.itemTotal = 0),
      (this.orderTotal = 0);
  }
  init() {
    (this.list = u("so-cart") ?? []), this.calculateItemSummary();
  }
  calculateItemSummary() {
    (this.itemTotal = this.list.reduce((e, t) => {
      const r = t.quantity ?? 1,
        a = t.FinalPrice ?? 0;
      return e + a * r;
    }, 0)),
      (document.querySelector(this.outputSelector.subtotal).innerText =
        this.itemTotal.toFixed(2));
  }
  calculateOrderTotal() {
    if (this.list.length === 0) {
      s("El carrito está vacío", !0);
      return;
    }
    (this.shipping = 10 + (this.list.length - 1) * 2),
      (this.tax = this.itemTotal * 0.06),
      (this.orderTotal = this.itemTotal + this.shipping + this.tax),
      this.displayOrderTotals();
  }
  displayOrderTotals() {
    (document.querySelector(this.outputSelector.shipping).innerText =
      this.shipping.toFixed(2)),
      (document.querySelector(this.outputSelector.tax).innerText =
        this.tax.toFixed(2)),
      (document.querySelector(this.outputSelector.total).innerText =
        this.orderTotal.toFixed(2));
  }
  formDataToJSON(e) {
    const t = new FormData(e),
      r = {};
    return (
      t.forEach(function (a, o) {
        r[o] = a;
      }),
      r
    );
  }
  packageItems(e) {
    return e.map((t) => ({
      id: t.Id,
      name: t.Name,
      price: t.FinalPrice,
      quantity: t.quantity ?? 1,
    }));
  }
  async checkout(e) {
    const t = this.formDataToJSON(e),
      r = this.packageItems(this.list),
      a = {
        orderDate: new Date().toISOString(),
        fname: t.fname,
        lname: t.lname,
        street: t.address,
        city: t.city,
        state: t.state,
        zip: t.zip,
        cardNumber: t.cardNumber,
        expiration: t.expiration,
        code: t.code,
        items: r,
        orderTotal: this.orderTotal.toFixed(2),
        shipping: this.shipping,
        tax: this.tax.toFixed(2),
      },
      o = new m();
    try {
      await o.checkout(a);
    } catch {
      s("Error when processing the order: ", !0);
    }
  }
}
h();
const n = new x("so-cart", {
  subtotal: "#subtotal",
  shipping: "#shipping",
  tax: "#tax",
  total: "#total",
});
n.init();
document.querySelector("#zip").addEventListener("input", (i) => {
  i.target.value.length === 5
    ? n.calculateOrderTotal()
    : ((document.querySelector(n.outputSelector.shipping).innerText = "0.00"),
      (document.querySelector(n.outputSelector.tax).innerText = "0.00"),
      (document.querySelector(n.outputSelector.total).innerText = "0.00"));
});
document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (i) => {
    i.preventDefault();
    const e = i.target,
      t = e.checkValidity();
    if ((e.reportValidity(), !t)) {
      s("Please fill in all required fields.", !0);
      return;
    }
    const r = e.cardNumber.value,
      a = e.expiration.value,
      o = g(r),
      c = f(a);
    if (!o) {
      s("Invalid Card Number", !0);
      return;
    }
    if (!c) {
      s("Invalid Expiration Date", !0);
      return;
    }
    try {
      await n.checkout(e),
        d("so-cart", []),
        p(),
        (window.location.href = "/checkout/success.html");
    } catch (l) {
      s("Error when processing the order: " + l.message, !0);
    }
  });
function g(i) {
  return /^\d{13,19}$/.test(i.replace(/\s/g, ""));
}
function f(i) {
  if (!/^\d{2}\/\d{2}$/.test(i)) return !1;
  const [e, t] = i.split("/"),
    r = new Date(),
    a = r.getFullYear() % 100,
    o = r.getMonth() + 1;
  return !(parseInt(t) < a || (parseInt(t) === a && parseInt(e) < o));
}
