import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

export default defineConfig({
  html: {
    template: "./src/index.html",
    inject: "body",
    favicon: "",
  },

  tools: {
    bundlerChain: (chain) => {
      // markdown
      chain.module
        .rule("md")
        .test(/\.md$/)
        .use("md-loader")
        .loader("md-loader");

      // images
      chain.module
        .rule("images")
        .test(/\.(png|jpe?g|gif|svg)$/i)
        .type("asset")
        .parser({
          dataUrlCondition: {
            maxSize: 8 * 1024, // Inline images smaller than 8KB
          },
        });

      // svg
      chain.module
        .rule("svg")
        .test(/\.svg$/)
        .type("asset");

      // tailwind
      chain.module
        .rule("css")
        .test(/\.css$/)
        .use("postcss-loader")
        .loader("postcss-loader");
    },
  },

  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "datamanagement",
      exposes: { "./App": "./src/App.tsx" },
    }),
  ],
  server: {
    port: 3001,
  },
});
