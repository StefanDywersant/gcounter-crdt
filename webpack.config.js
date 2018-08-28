const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
//	context: path.resolve(__dirname, './src'),
	entry: {
		app: './src/app.jsx'
	},
	module: {
		rules: [
			{
				test: /Node\/node\.js$/,
				use: [
					'raw-loader',
					{
						loader: 'babel-loader',
						options: { presets: ['es2015'] }
					}
				]
			},
			{
				test: /\.jsx?$/,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015', 'react'] }
				}],
				exclude: /node_modules/
			},
			{
				test: /\.s?css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true,
							plugins: (loader) => [autoprefixer]
						}
					},
					'sass-loader'
				]
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		})
	],
	devtool: 'source-map'
};
