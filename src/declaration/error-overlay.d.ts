import webpack from 'webpack';

declare module 'error-overlay-webpack-plugin' {
  export default {
    new: () => webpack.WebpackPluginInstance
  };
}
