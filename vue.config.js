const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: "/",
  outputDir: "dist",
  transpileDependencies: true,
  // chainWebpack: (config) => {
  //   config.resolve.alias.set("@", path.resolve(__dirname, "src/"));
  // },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/variables.scss";
        `,
      },
    },
  },
});
