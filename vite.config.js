import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        success: resolve(__dirname, "src/checkout/success.html"),
      },
    },
  },
});
