/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

const isProd = process.env.NODE_ENV === 'production';

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        // exclude: /\.css$/,
        use: [
          {
            // loader: 'style-loader',
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/',
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // localIdentName: '[name]__[local]__[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              //   includePaths: ['src'],
            },
          },
        ],
      },

      {
        test: /\.css$/,
        // exclude: /node_modules/,
        // include: (cssPath) => {
        //   console.log('css file path: ', cssPath);
        //   return true;
        // },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // publicPath: '/public/path/to/',
            },
          },
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css', '.scss'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProd
        ? '[name].[contenthash:8].chunk.css'
        : '[name].chunk.css',
    }),
  ],
};

export default configuration;
