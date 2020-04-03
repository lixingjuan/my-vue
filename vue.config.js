/*
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2020-02-05 21:51:09
 * @copyright: Copyright (c) 2019, Hand
 */
module.exports = {
  devServer: {
    proxy: "http://localhost:4000" // 配置跨域代理
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: config => {
    // 修复HMR失效问题？？？是为啥？
    config.resolve.symlinks = true;
    require("vux-loader").merge(config, {
      options: {},
      plugins: ["vux-ui"]
    });
  }
};
