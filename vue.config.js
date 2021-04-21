module.exports = {
    devServer: {
        proxy: 'https://www.googleapis.com/youtube/v3/',
    },
    css: {
        loaderOptions: {
            sass: {
                additionalData: `@import "src/assets/scss/main.scss";`
              },
        }
      }
  }
