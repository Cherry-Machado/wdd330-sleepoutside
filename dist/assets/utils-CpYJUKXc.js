(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) o(r);
  new MutationObserver((r) => {
    for (const n of r)
      if (n.type === "childList")
        for (const s of n.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && o(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function a(r) {
    const n = {};
    return (
      r.integrity && (n.integrity = r.integrity),
      r.referrerPolicy && (n.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (n.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (n.credentials = "omit")
          : (n.credentials = "same-origin"),
      n
    );
  }
  function o(r) {
    if (r.ep) return;
    r.ep = !0;
    const n = a(r);
    fetch(r.href, n);
  }
})();
function l(t) {
  return JSON.parse(localStorage.getItem(t));
}
function d(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
function m(t) {
  const e = window.location.search;
  return new URLSearchParams(e).get(t);
}
function f(t, e, a, o = "afterbegin", r = !1) {
  const n = a.map(t);
  r && (e.innerHtml = ""), e.insertAdjacentHTML(o, n.join(""));
}
function c(t, e, a, o) {
  e.insertAdjacentHTML("afterbegin", t);
}
async function i(t) {
  return await (await fetch(t)).text();
}
async function p() {
  const t = await i("../partials/header.html"),
    e = await i("../partials/footer.html"),
    a = document.querySelector("#main-header"),
    o = document.querySelector("#main-footer");
  c(t, a), c(e, o), u();
}
function h(t, e) {
  let a = 0;
  return t.forEach((o) => (a += e(o))), `$ ${a.toFixed(2)}`;
}
function u() {
  const t = l("so-cart") || [],
    e = document.getElementById("cartCount");
  t.length != 0
    ? ((e.innerHTML = t.length), e.classList.remove("hidden"))
    : e.classList.add("hidden");
}
function g(t, e = !0, a = 4e3) {
  const o = document.createElement("div");
  o.classList.add("alert"),
    (o.innerHTML = `<p>${t}</p><span>X</span>`),
    o.addEventListener("click", function (n) {
      n.target.tagName == "span" && r.removeChild(this);
    });
  const r = document.querySelector("main");
  r.prepend(o),
    e && window.scrollTo(0, 0),
    setTimeout(function () {
      r.removeChild(o);
    }, a);
}
function y() {
  document
    .querySelectorAll(".alert")
    .forEach((e) => document.querySelector("main").removeChild(e));
}
export { g as a, m as b, f as c, l as g, p as l, h as p, y as r, d as s };
