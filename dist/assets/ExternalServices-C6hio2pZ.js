const o = "https://wdd330-backend.onrender.com";
async function r(s) {
  const t = await s.json();
  if (s.ok) return t;
  throw { name: "servicesError", message: t };
}
class c {
  constructor() {}
  async getData(t) {
    const e = await fetch(`${o}/products/search/${t}`);
    return (await r(e)).Result;
  }
  async findProductById(t) {
    const e = await fetch(`${o}/product/${t}`);
    return (await r(e)).Result;
  }
  async checkout(t) {
    const e = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    };
    try {
      const a = await fetch(`${o}/checkout/`, e);
      return await r(a);
    } catch (a) {
      throw new Error("Error en el servidor: " + a.message);
    }
  }
}
export { c as E };
