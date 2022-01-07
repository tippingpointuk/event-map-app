module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/event-map-app/cambo'
    : '/'
  ,
  outputDir: "cambo",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/init.scss";
        `
      }
    }
  }
};
