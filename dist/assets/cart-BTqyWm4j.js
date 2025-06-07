import{l,g as n,p as s,s as d}from"./utils-DQjMQEyP.js";l();function i(t){const c=t.target.getAttribute("data-id");let e=n("so-cart");const a=e.findIndex(r=>r.Id===c);e[a].quantity-=1,e[a].quantity<=0&&(e=e.filter(r=>r.Id!==c)),d("so-cart",e),o()}function o(){const t=n("so-cart"),c=t.map(a=>u(a)),e=s(t,a=>a.FinalPrice*a.quantity);document.querySelector(".cart-total__amount").textContent=e,document.querySelector(".product-list").innerHTML=c.join(""),document.querySelectorAll(".cart-card__delete").forEach(a=>{a.addEventListener("click",i)})}function u(t){return`
  <li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${t.Images.PrimaryMedium}"
        alt="${t.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${t.quantity}</p>
    <p class="cart-card__price">$${t.FinalPrice}</p>  
    <span class="cart-card__delete" data-id=${t.Id}>X</span>
  </li>`}document.querySelector("button.checkout").addEventListener("click",()=>window.location.replace("../checkout/index.html"));o();
