const baseURL = require("dotenv").config().parsed.VITE_SERVER_URL || "https://wdd330-backend.onrender.com";

async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    //throw new Error("Bad Response");
    throw { name: "servicesError", message: response };
  }
}

export default class ExternalServices {
  constructor() {}
  async getData(category) {
    const response = await fetch(`${baseURL}/products/search/${category}`);
    //const response = await fetch(`https://wdd330-backend.onrender.com/products/search/${category}`);

    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}/product/${id}`);
    //const response = await fetch(`https://wdd330-backend.onrender.com/product/${id}`);

    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(`${baseURL}/checkout/`, options);
      //const response = await fetch(`https://wdd330-backend.onrender.com/checkout/`, options);
      const data = await convertToJson(response);
      return data;
    } catch (error) {
      throw new Error("Error en el servidor: " + error.message);
    }
  }
}
