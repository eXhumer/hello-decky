const { defineConfig } = require("rollup");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const replace = require("@rollup/plugin-replace");
const typescript = require("@rollup/plugin-typescript");
const importAssets = require("rollup-plugin-import-assets");

const { name } = require("./plugin.json");

module.exports = defineConfig({
  input: "./src/index.tsx",
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript(),
    json(),
    replace({
      preventAssignment: false,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    importAssets({
      publicPath: `http://127.0.0.1:1337/plugins/${name}/`
    })
  ],
  context: "window",
  external: ["react", "react-dom", "decky-frontend-lib"],
  output: {
    file: "dist/index.js",
    globals: {
      react: "SP_REACT",
      "react-dom": "SP_REACTDOM",
      "decky-frontend-lib": "DFL"
    },
    format: "iife",
    exports: "default",
  },
});
