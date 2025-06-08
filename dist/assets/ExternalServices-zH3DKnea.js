async function n(a) {
  const t = await a.json();
  if (a.ok) return t;
  throw { name: "servicesError", message: t };
}
class s {
  constructor() {}
  async getData(t) {
    const e = await fetch(
      `https://wdd330-backend.onrender.com/products/search/${t}`,
    );
    return (await n(e)).Result;
  }
  async findProductById(t) {
    const e = await fetch(`https://wdd330-backend.onrender.com/product/${t}`);
    return (await n(e)).Result;
  }
  async checkout(t) {
    const e = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    };
    try {
      const r = await fetch("https://wdd330-backend.onrender.com/checkout/", e);
      return await n(r);
    } catch (r) {
      throw new Error("Error en el servidor: " + r.message);
    }
  }
}
export { s as E };
