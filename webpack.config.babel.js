// utilities
import path from 'path';
import merge from 'webpack-merge';
// import webpack plugins
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import {
  DefinePlugin,
} from 'webpack';
// import postcss plugins
import autoprefixer from 'autoprefixer';
import aspectRatio from 'postcss-aspect-ratio';
import hexAlpha from 'postcss-color-hex-alpha';
import nestedRules from 'postcss-nested';
// import configurators
import makeBuildConfig from './webpack.build.config.babel.js';
import makeDevConfig from './webpack.dev.config.babel.js';
import makeParkerConfig from './webpack.parker.config.babel.js';

// reading npm script name as webpack target
const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  test: path.join(__dirname, 'tests'),
  liveBasePath: '/stackup/',  // change this if the project is not on root folder when live
};
const pkg = require('./package.json');

const isLive = process.argv.includes('--live') || process.argv.includes('-l');

const common = {
  entry: {
    app: ['babel-polyfill', PATHS.app],
  },
  output: {
    path: PATHS.build,
    filename: '[name]-[hash].js',
  },
  // ignored during BUILD
  devServer: {
    contentBase: PATHS.build,

    // display only errors to reduce the amount of output
    stats: 'errors-only',

    // parse host and port from env so this is easy to customize
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9999,
  },
  module: {
    // localforage is a pre-built module, this avoid useless warnings
    noParse: path.join(__dirname, 'node_modules/localforage/dist/localforage.js'),
    loaders: [
      {
        test: /\.(jpg|png|gif|ttf|otf|eot|woff|svg)$/,
        loader: 'file?name=[path][name]-[hash].[ext]&context=app',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'html',
        query: {
          root: `${__dirname}`,
          interpolate: true,
        },
      },
      {
        test: /\.po$/,
        loaders: ['i18next-po-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel?cacheDirectory'],
      },
    ],
  },

  postcss: () => [
    autoprefixer({ browsers: ['last 2 versions'] }),
    aspectRatio,
    hexAlpha(),
    nestedRules,
  ],

  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(PATHS.app, './template.ejs'),
      inject: true,
      chunksSortMode: 'dependency',

      // inject meta info into template
      title: pkg.title,
    }),
    new DefinePlugin({
      BASE_PATH: isLive ? `"${PATHS.liveBasePath}"` : '"/"',
    }),
  ],
  resolve: {
    // require will search for folders -> js files -> jsx files
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('./app'),
      // easy access to css variable files
      path.resolve('./app/styles/variables'),
    ],
  },
};

process.env.BABEL_ENV = 'STATIC';

let mergedConfig = common;
if (TARGET.match(/^dev(:hot)?$/)) {
  // comunicating setup to babel: check .babelrc
  process.env.BABEL_ENV = 'HOT';

  // merge configs
  mergedConfig = merge(
    mergedConfig,
    makeDevConfig()
  );
}

if (TARGET === 'build' || TARGET === 'dev:static') {
  // merge configs
  mergedConfig = merge(
    mergedConfig,
    makeBuildConfig({
      paths: PATHS,
      pkg,
      isLive,
      // if true `screwIE8` will remove all hacks for ie8 and below
      screwIE8: true,
    })
  );
}

if (TARGET.match(/^(build)|(dev)/)) {
  // merge configs
  mergedConfig = merge(
    mergedConfig,
    {
      plugins: [
        new WebpackNotifierPlugin({
          title: pkg.title,
          contentImage: path.join(__dirname, 'webpack', 'images', 'build-logo.png'),
          excludeWarnings: true,
        }),
      ],
    }
  );
}

if (TARGET === 'parker') {
  // merge configs
  mergedConfig = merge(
    mergedConfig,
    makeParkerConfig({
      paths: PATHS,
      pkg,
    })
  );
}

// setup a const to export (eslint: import/no-mutable-exports)
const config = mergedConfig;

export default config;
