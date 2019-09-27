module.exports = {
  chainWebpack: config => {
    // Загрузчик GraphQL
    config.module
    .rule('webpack-glsl-loader')
    .test(/\.(glsl|vs|fs|vert|frag)$/)
    .use('webpack-glsl-loader')
      .loader('webpack-glsl-loader')
      .end()
  }
}

// rules: [
//   {
//     test: /\.(glsl|vs|fs|vert|frag)$/,
//     exclude: /node_modules/,
//     use: [
//       'raw-loader',
//       'glslify-loader'
//     ]
//   }
// ]