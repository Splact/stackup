// import webpack plugins
import {
  DefinePlugin,
  BannerPlugin,
  optimize,
} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

function makeConfig({ paths, pkg, isLive, screwIE8 }) {
  const banner = `${pkg.name} - ${pkg.version}\nMade with love by ${pkg.author}`;

  if (isLive) {
    console.log('Building for LIVE env...');
    console.log(`Build root -> "${paths.liveBasePath}"`);
  }

  return {
    // Define vendor entry point needed for splitting
    entry: {
      // Exclude all node_modules that hasn't a package.json as main file for example alt-utils
      // vendor: Object.keys(pkg.dependencies).filter((v) => v !== 'alt-utils'),
      vendor: Object.keys(pkg.dependencies),
    },
    output: {
      // path: paths.build,
      // filename: '[name]-[chunkhash].js',
      // chunkFilename: '[chunkhash].js',
      publicPath: isLive ? paths.liveBasePath : '/',
    },
    module: {
      loaders: [
        // Define CSS setup w/ ExtractTextPlugin
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', [
            'css?camelCase&modules&importLoaders=1&' +
            'localIdentName=[folder]--[local]---[emoji:1]',
            'postcss?sourceMap',
          ]),
          include: paths.app,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([paths.build]),

      // Output extracted CSS to a file
      new ExtractTextPlugin('css/[name]-[chunkhash].css', {
        // allChunks: true, // CHECK
      }),

      // extract vendor and manifest files removing duplicate modules (used both by app and vendor
      // modules)
      new optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
      }),

      // setting NODE_ENV to production reduces React library size
      new DefinePlugin({
        'process.env.NODE_ENV': '"production"',
      }),
      new optimize.OccurrenceOrderPlugin(),
      new optimize.DedupePlugin(),
      new optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: screwIE8,
          warnings: false,
          // drop `console` statements
          drop_console: true,
        },
        mangle: {
          screw_ie8: screwIE8,
        },
        output: {
          comments: false,
          screw_ie8: screwIE8,
        },
      }),
      new BannerPlugin(banner, {
        raw: false,
        entryOnly: true,
      }),
    ],
  };
}

export default makeConfig;
