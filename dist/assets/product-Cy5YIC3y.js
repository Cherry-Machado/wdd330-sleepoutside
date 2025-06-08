import{s,a as r,l as a,g as d}from"./utils-zCIKEsvN.js";import{E as c}from"./ExternalServices-zH3DKnea.js";function n(e,o=1e3){const t=document.createElement("div");t.className="custom-alert",t.innerText=e,t.style.position="fixed",t.style.top="20px",t.style.right="20px",t.style.backgroundColor="#4CAF50",t.style.color="white",t.style.padding="15px",t.style.zIndex="1000",t.style.borderRadius="5px",t.style.boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)",document.body.appendChild(t),setTimeout(()=>{t.remove()},o)}function l(e,o=0){return`<section class="product-detail"> <h3>${e.Brand.Name}</h3>
        <h2 class="divider">${e.NameWithoutBrand}</h2>
        <img
            class="divider"
            src="${e.Colors[o].ColorPreviewImageSrc}"
            alt="${e.NameWithoutBrand}"
        />
        <p class="product-card__price">$${e.FinalPrice}</p>
        <p class="product__color">${e.Colors[o].ColorName}</p>
        <div class="product__color-list">
            ${e.Colors.map((t,i)=>`
                <img 
                    class="color-option"
                    data-index="${i}" 
                    src="${t.ColorChipImageSrc}"
                    alt="${t.ColorName}" />
                `).join("")}
        </div>
        <p class="product__description">
        ${e.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${e.Id}">Add to Cart</button>
        </div></section>`}class u{constructor(o,t){this.productId=o,this.product={},this.dataSource=t,this.colorIndex=0}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails("main"),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this)),document.addEventListener("click",o=>{o.target.classList.contains("color-option")&&(this.colorIndex=parseInt(o.target.dataset.index,10),s("colorIndex",this.colorIndex),window.location.reload())})}updateCartListWithQuantity(){const o=r("so-cart")||[],t=o.findIndex(i=>i.Id===this.productId);return t<0?(this.product={...this.product,quantity:1},o.push(this.product),o):(o[t].quantity+=1,o)}addToCart(){const o=this.updateCartListWithQuantity();s("so-cart",o),n("Product added successfully!"),setTimeout(()=>{window.location.href=`/product_listing/?category=${this.product.Category}`},1e3)}renderProductDetails(o){const t=document.querySelector(o);let i=r("colorIndex")||0;this.product.Colors[i]&&(this.colorIndex=i),t.insertAdjacentHTML("afterBegin",l(this.product,this.colorIndex))}}a();const p=d("product"),h=new c("tents"),m=new u(p,h);m.init();
