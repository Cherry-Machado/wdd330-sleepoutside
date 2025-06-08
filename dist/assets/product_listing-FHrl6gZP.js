import{r as s,l as o,g as i}from"./utils-zCIKEsvN.js";import{E as n}from"./ExternalServices-zH3DKnea.js";function d(t){return`<li class="product-card">
                <a href="/product_pages/?product=${t.Id}">
                <img src="${t.Images.PrimaryLarge}" alt="Image of ${t.Name}">
                <h2 class="card__brand">${t.Brand.Name}</h2>
                <h3 class="card__name">${t.Name}</h3>
                <p class="product-card__price">$${t.FinalPrice}</p>
                </a>
            </li>`}class l{constructor(e,a,c){this.category=e,this.dataSource=a,this.listElement=c}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector("#product-category").textContent=this.category}renderList(e){s(d,this.listElement,e)}}o();const r=i("category"),m=new n,u=document.querySelector(".product-list"),g=new l(r,m,u);document.querySelector("#current-category").textContent=r;g.init();
