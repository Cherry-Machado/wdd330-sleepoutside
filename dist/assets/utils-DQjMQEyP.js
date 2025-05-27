(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) a(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && a(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function a(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
function l(t) {
  return JSON.parse(localStorage.getItem(t));
}
function d(t, e) {
  localStorage.setItem(t, JSON.stringify(e));
}
function f(t) {
  const e = window.location.search;
  return new URLSearchParams(e).get(t);
}
function m(t, e, n, a = "afterbegin", r = !1) {
  const o = n.map(t);
  r && (e.innerHtml = ""), e.insertAdjacentHTML(a, o.join(""));
}
function c(t, e, n, a) {
  e.insertAdjacentHTML("afterbegin", t);
}
async function i(t) {
  return await (await fetch(t)).text();
}
async function p() {
  const t = await i("../partials/header.html"),
    e = await i("../partials/footer.html"),
    n = document.querySelector("#main-header"),
    a = document.querySelector("#main-footer");
  c(t, n), c(e, a), u();
}
function g(t, e) {
  let n = 0;
  return t.forEach((a) => (n += e(a))), `$ ${n.toFixed(2)}`;
}
function u() {
  const t = l("so-cart") || [],
    e = document.getElementById("cartCount");
  t.length != 0
    ? ((e.innerHTML = t.length), e.classList.remove("hidden"))
    : e.classList.add("hidden");
}
export { f as a, l as g, p as l, g as p, m as r, d as s };
