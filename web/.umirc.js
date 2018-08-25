import { resolve } from 'path';

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const { PUBLIC_PATH } = process.env;
const publicPath = PUBLIC_PATH || '/';

console.log('publicPath:' + publicPath)

export default {
  // "base": publicPath,
  "publicPath": publicPath,
  "define": {
    "PUBLIC_PATH": publicPath,
  },
  "copy": [
    // {
    //   "from": resolve(__dirname,'./src/utils/pdf.js/web/cmaps'),
    //   "to": "static/pdfjs",
    // },
    {
      "from": resolve(__dirname,'./src/static'),
      "to": "static",
    },
  ],
  "alias": {
    "components": resolve(__dirname,'./src/components'),
    "utils": resolve(__dirname,'./src/utils'),
  },
  "plugins": [
    [
      "umi-plugin-react",
      {
        dva: true,
        antd: true,
        dll: {
          exclude: [],
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
        },
      }
    ],
  ],
  chainWebpack(config, { webpack }) {
    // console.log(config.plugins)
    // console.log(config.plugins.values())
    // console.log(HtmlWebpackIncludeAssetsPlugin)
    console.log(config.toConfig())

    config
      .plugin('HtmlWebpackIncludeAssetsPlugin')
        .after('HtmlWebpackPlugin')
        .use(HtmlWebpackIncludeAssetsPlugin, {
          assets: ['pdfjs/pdf.js'],
          append: true,
          publicPath: publicPath,
        })
        .init((Plugin, args) => new Plugin({...args}))
        .end()
      // .plugin('HtmlWebpackPlugin')
      //   .use(HtmlWebpackPlugin, {
      //     template: resolve(__dirname, './src/pages/document.ejs'),
      //   })
      //   .init((Plugin, args) => new Plugin({...args}))
    console.log(config.toConfig())
      // .tap(args => { return {...args} })
  },
}