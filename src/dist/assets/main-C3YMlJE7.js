import { r as a, c as n } from "./utils-B7XW-JzD.js";
function c(t) {
  if (t.ok) return t.json();
  throw new Error("Bad Response");
}
class o {
  constructor(e) {
    (this.category = e), (this.path = `../json/${this.category}.json`);
  }
  getData() {
    return fetch(this.path)
      .then(c)
      .then((e) => e);
  }
  async findProductById(e) {
    return (await this.getData()).find((r) => r.Id === e);
  }
}
function i(t) {
  return `
    <li class="product-card">
      <a href="../product_pages/index.html?product=${t.Id}">
        <img src="${t.Image}" alt="${t.Name}">
        <h2>${t.Brand.Name}</h2>
        <h3>${t.Name}</h3>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `;
}
class d {
  constructor(e, s, r) {
    (this.category = e), (this.dataSource = s), (this.listElement = r);
  }
  async init() {
    const e = await this.dataSource.getData();
    this.renderList(e),
      (document.querySelector("#product-category").textContent = this.category);
  }
  renderList(e) {
    a(i, this.listElement, e);
  }
}
const h = new o("tents"),
  u = document.querySelector(".product-list"),
  l = new d("Tents", h, u);
n();
l.init();
export { o as P };
