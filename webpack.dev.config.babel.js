// import webpack plugins
import { HotModuleReplacementPlugin } from 'webpack';
import NpmInstallPlugin from 'npm-install-webpack-plugin';

function makeConfig() {
  return {
    output: {
      publicPath: '/',
    },
    // rebuild faster than source-map (production not supported)
    devtool: 'eval-source-map',
    devServer: {
      // unlike the cli flag, this doesn't set HotModuleReplacementPlugin (setted below)
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
    },
    module: {
      loaders: [
        // Define CSS setup w/o ExtractTextPlugin
        {
          test: /\.css$/,
          loaders: [
            'style?sourceMap',
            'css?camelCase&modules&importLoaders=1&' +
            'localIdentName=[folder]--[local]---[emoji:1]',
            'postcss?sourceMap',
          ],
        },
      ],
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new HotModuleReplacementPlugin({
        multiStep: true,
      }),
      // automatically installs modules required
      new NpmInstallPlugin({
        save: true, // --save
      }),
    ],
  };
}

export default makeConfig;
