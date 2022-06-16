const { override, addWebpackAlias, addLessLoader } = require('customize-cra');
const path = require('path');
const rewirePostcss = require('react-app-rewire-postcss');
module.exports = override(
  addWebpackAlias({
    // 配置别名
    '@components': path.resolve(__dirname, './src/components'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@utils': path.resolve(__dirname, './src/utils'),
    '@': path.resolve(__dirname, './src'),
    '@constant': path.resolve(__dirname, './src/constant'),
  }),
  addLessLoader({
    // 配置less,注意依赖版本问题，过高会报错
    javascriptEnabled: true,
  }),
  config => {
    // 重写postcss
    rewirePostcss(config, {
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        }),
      ],
    });

    return config;
  },
);
