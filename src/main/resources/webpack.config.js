/**
 * Base line webpack.config.js for the jetty-jersey-swagger server
 * Update this to reflect changes
 */
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
		entry: {
			index: path.resolve(__dirname, 'src/index/index.js'),
			about: path.resolve(__dirname, 'src/about/index.js'),
			d3csv: path.resolve(__dirname, 'src/d3csv/index.js'),
			// need to add an entry for every page here.
			// possible to do this programmatically by scanning the ./src directory for js files?
		},
		output: {
			filename: '[name]-bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		devtool: 'inline-source-map',
		devServer: {
			contentBase: path.resolve(__dirname, "dist"),
			port: 9000,
			watchContentBase: true,
			proxy: [
				{
					context: ['/api','/doc'],
					target: 'http://localhost:8080', 
					secure: false,
				}
				// this would needs to be updated to match port and paths that the backend api is running on 
				// if the backend defaults are changed
			]
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ]
				},
				{
		            test: /\.less$/,
		            use: [{
		                loader: "style-loader" // creates style nodes from JS strings
		            }, {
		                loader: "css-loader" // translates CSS into CommonJS
		            }, {
		                loader: "less-loader" // compiles Less to CSS
		            }]
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
							loader: "markdownit-loader",
							options: {
								preset: 'default',
								breaks: true,
								typographer: true,
								use: [
									require('markdown-it-sub'),
									require('markdown-it-sup'),
									require('markdown-it-decorate'),
									//add more plugins here.... 
									]
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
			new HtmlWebpackPlugin({
				title: 'About this site',
				filename: 'd3csv.html',
				chunks: ['d3csv'],
				template: path.resolve(__dirname, 'src/common/templates/basic-page.ejs') // Load a custom template (ejs by default see the FAQ for details)
			}),
			// entry for every page needed or have a html template file in the directory
			]
		//TODO: Chunks plugin??
};