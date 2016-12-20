import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

function makeConfig({ paths }) {
  return {
    module: {
      loaders: [
        // Define CSS setup w/ ExtractTextPlugin
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', [
            'css?camelCase&modules&importLoaders=1&' +
            'localIdentName=[folder]--[local]---[hash:base64:5]',
            'postcss?sourceMap',
          ]),
          include: paths.app,
        },
      ],

    },
    plugins: [
      new CleanWebpackPlugin([paths.build]),
      // Output extracted CSS to a file
      new ExtractTextPlugin('style.css'),
    ],
  };
}

export default makeConfig;
