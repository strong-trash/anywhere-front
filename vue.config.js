const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/anywhere-front",
  outputDir: "dist",
  transpileDependencies: true,
});
