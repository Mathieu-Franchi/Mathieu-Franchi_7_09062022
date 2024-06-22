const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'dist', // Assurez-vous que cela correspond au répertoire de publication configuré sur Render
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:3000', // Utilise l'URL de l'API du backend
        changeOrigin: true,
      },
    },
  },
});
