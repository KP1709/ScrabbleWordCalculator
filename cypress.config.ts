import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    defaultBrowser: 'chrome',
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    defaultBrowser: 'chrome',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
