/**
 * Basic webpack config file that specifies entry point of javascript and output budled JS file
 * This file is referenced by the scripts tab of npm's package.json
 */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
		entry: {
			index: path.resolve(__dirname, 'src/index/index.js'),
			about: path.resolve(__dirname, 'src/about/index.js'),
			// need an entry for every page here
		},
		output: {
			filename: '[name]-bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		devtool: 'source-map',
		devServer: {
			 contentBase: path.join(__dirname, "dist"),
			 port: 9000,
			 watchContentBase: true
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ]
				},
				{
					test: /\.(csv|tsv)$/,
					use: 'csv-loader'
				},
				{
					test: /\.xml$/,
					use: 'xml-loader',
				},
				{
					test: /\.md$/,
					use: [
						{
							loader: "html-loader"
						},
						{
							loader: "markdown-loader",
							options: {
								gfm: true,
								tables: true,
								breaks: false,
								pedantic: false,
								sanitize: false,
								smartLists: true,
								smartypants: false
							}
						}
						]
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader'
						]
				}
				]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: 'Index',
				filename: 'index.html',
				chunks: ['index'],
				template: path.resolve(__dirname, 'src/common/templates/basic-page.ejs') // Load a custom template (ejs by default see the FAQ for details)
			}),
			new HtmlWebpackPlugin({
				title: 'About this site',
				filename: 'about.html',
				chunks: ['about'],
				template: path.resolve(__dirname, 'src/common/templates/basic-page.ejs') // Load a custom template (ejs by default see the FAQ for details)
			}),
			
			]
		//TODO: Chunks plugin??
};