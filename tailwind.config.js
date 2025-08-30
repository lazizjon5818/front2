/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{ts,tsx}",
      // Flowbite scanning:
      "node_modules/flowbite-react/lib/esm/**/*.js",
      "node_modules/flowbite/**/*.js",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require("flowbite/plugin"),
    ],
  }
  