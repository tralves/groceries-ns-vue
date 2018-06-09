const path = require('path');
const webpack = require('webpack');
const winston = require('winston-color');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackSynchronizableShellPlugin = require('webpack-synchronizable-shell-plugin');
const NativeScriptVueExternals = require('nativescript-vue-externals');
const NativeScriptVueTarget = require('nativescript-vue-target');

// Determine platform(s) and action from webpack env arguments
module.exports = env => {

  const action = (!env || !env.tnsAction) ? 'build' : env.tnsAction;

  if (!env || (!env.android && !env.ios && !env.web)) {
    return [config('android'), config('ios', action)];
  }

  return env.android && config('android', action)
    || env.ios && config('ios', action)
    || env.web && config('web', action)
    || {};
};

// Generate platform-specific webpack configuration
function config(platform, action) {

  const build = getBuildType(platform);

  // Prepare NativeScript application from template (if necessary)
  require('./prepare')(build);

  winston.info(`Bundling application for ${platform}...`);

  // CSS / SCSS style extraction loaders
  const cssLoader = ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          url: false,
          sourceMap: action === 'debug',
        },
      },
    ],
  });
  const scssLoader = ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          url: false,
          includePaths: [path.resolve(__dirname, 'node_modules')],
          sourceMap: action === 'debug',
        },
      },
      'sass-loader',
    ],
  });

  return {

    target: build === 'native' ? NativeScriptVueTarget : 'web',

    entry: path.resolve(__dirname, `./src/main.${build}.js`),

    output: {
      path: path.resolve(__dirname, `./dist-${build}/app`),
      filename: `app.${platform}.js`,
    },


    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },

        {
          test: /\.css$/,
          use: cssLoader,
        },
        {
          test: /\.scss$/,
          use: scssLoader,
        },

        {
          test: /\.vue$/,
          loader: platformIsNative(platform) ? 'ns-vue-loader' : 'vue-loader',
          options: {
            loaders: {
              css: cssLoader,
              scss: scssLoader,
            },
          },
        },
      ],
    },

    resolve: {
      modules: [
        'node_modules/tns-core-modules',
        'node_modules',
      ],
      extensions: getExtensions(platform),
    },

    externals: platformIsNative(platform) ? NativeScriptVueExternals : {},

    plugins: [

      new webpack.DefinePlugin({
        'process.build': {
          'build': build,
          'platform': platform
        }
      }),

      // Extract CSS to separate file
      new ExtractTextPlugin({filename: `app.${platform}.css`}),

      // Optimize CSS output
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {discardComments: {removeAll: true}},
        canPrint: false,
      }),

      // Minify JavaScript code
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        output: {comments: false},
      }),

      // Copy src/assets/**/* to dist-native/
      new CopyWebpackPlugin([
        {from: 'assets', context: 'src'},
      ]),

      // Execute post-build scripts with specific arguments
      new WebpackSynchronizableShellPlugin({
        onBuildEnd: {
          scripts: [
            ... action && platformIsNative(platform) ? [`node launch.js ${platform} ${action}`] : [],
          ],
          blocking: false,
        },
      }),

    ],

    stats: 'errors-only',

    node: {
      'http': false,
      'timers': false,
      'setImmediate': false,
      'fs': 'empty',
    },
  };
};

// Resolve platform-specific modules like module.android.js
function getExtensions(platform) {

  return ['js', 'css', 'scss', 'vue']
    .reduce((exts, ext) => {
      exts.push(`.${platform}.${ext}`)
      if (platformIsNative(platform)) exts.push(`.native.${ext}`)
      exts.push(`.${ext}`)
	    return exts
    }, [])
}

function platformIsNative(platform) {
  return ['ios', 'android'].includes(platform);
}

function getBuildType(platform) {
  return platformIsNative(platform) ? 'native' : 'web';
}