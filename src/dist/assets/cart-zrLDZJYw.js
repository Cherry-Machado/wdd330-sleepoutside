import{g as i,p as C,s,l as y}from"./utils-DQjMQEyP.js";function p(a){return`<li class="cart-card dividerr">
    <a href="#" class="cart-card_image">
        <img
            src="${a.Image}"
            alt="${a.Name}"
        />
    </a>
    <a href="#">
        <h2 class="card__name">${a.Name}</h2>
    </a>
    <p class="cart-card__color">${a.Colors[0].ColorName}</p>
    <button class="decrease">-</button>
    <p class="cart-card__quantity">qty: ${a.quantity}</p>
    <button class="increase">+</button>
    <button class="cart-card__delete" data-id="${a.Id}">Eliminar</button>
    <p class="cart-card__price">${a.FinalPrice}</p>
    </li>`}class q{constructor(e,r){this.key=e,this.parentSelector=r}renderCartContents(){const e=i("so-cart"),r=e.map((t,o)=>p(t)),n=C(e,t=>t.FinalPrice*t.quantity);document.querySelector(".cart-total__amount").textContent=n,document.querySelector(".product-list").innerHTML=r.join(""),document.querySelectorAll(".cart-card").forEach((t,o)=>{const c=e[o],d=t.querySelector(".cart-card__quantity"),l=t.querySelector(".increase"),u=t.querySelector(".decrease");l.addEventListener("click",()=>{c.quantity++,d.textContent=c.quantity,s("so-cart",e),this.renderCartContents()}),u.addEventListener("click",()=>{c.quantity>1&&(c.quantity--,d.textContent=c.quantity,s("so-cart",e),this.renderCartContents())})}),document.querySelectorAll(".cart-card__delete").forEach(t=>{t.addEventListener("click",this.deleteCartContent.bind(this))})}deleteCartContent(e){console.log("Botón eliminar clickeado");const r=e.target.getAttribute("data-id");let n=i("so-cart");const t=n.findIndex(o=>o.Id===r);t!==-1&&(n.splice(t,1),s("so-cart",n),this.renderCartContents())}}const m=new q("so-cart",".product-list");y();window.addEventListener("DOMContentLoaded",()=>{m.renderCartContents()});
