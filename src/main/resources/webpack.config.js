/**
 * Base line webpack.config.js for the jetty-jersey-swagger server
 * Update this to reflect changes
 */

var pages = require('./webpack.pages.js');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var staticConfig = {
		/*entry: {
			index: path.resolve(__dirname, 'src/index/index.js'),
		}, entries are handled in the webpack.pages.js*/
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
					use: [ 'style-loader', 'css-loader', 'less-loader' ]
				},
				{
					test: /\.(csv|tsv)$/,
					use: 'csv-loader'
				},
				{
					test: /\.(xml|mm)$/,
					use: 'xml-loader',
				},
				{
					test: /\.md$/,
					use: [
						{
							loader: "html-loader",
							options: {
								interpolate: true,  // allows ${import("./anotherfile.html")} statements in markdown
								removeComments: false,
								collapseWhitespace: false
							}
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
									require('markdown-it-decorate'), // allows <!-- {.classname} --> to apply to previous markdown element
									[require('markdown-it-implicit-figures'), {figcaption: true}] // ![some caption](./image.png)
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
				},
				{
					test: /\.html$/,
					use: [ {
						loader: 'html-loader',
						options: {
							interpolate: true,   // allows ${import("./anotherfile.html")} statements in html
							removeComments: false,
							collapseWhitespace: false
						}
					}]
				}
				]
		},
		resolve: {                                                                                
		    modules: [
		    	"web_loaders", "web_modules", "node_loaders", "node_modules",
		    	//path.join(__dirname, '../../../../node_modules'),
		    	//path.join(__dirname)
		    ]
		}, 
		plugins: [
			new webpack.ProvidePlugin({
				  $: 'jquery',
				  jQuery: 'jquery',
				  _: 'lodash',
				  d3: 'd3'
			}) /*,
			new HtmlWebpackPlugin({
				title: 'Index',
				filename: 'index.html',
				chunks: ['index'],
				template: path.resolve(__dirname, 'src/common/templates/basic-page.ejs') // Load a custom template (ejs by default see the FAQ for details)
			}),
			html webpack plugin created by dynamic configuration from webpack.pages.js */
		]
};

var dynamicConfig = function(pages) {
	var out = new Object();
	
	var tmp = new Object();
	pages.forEach(p =>
		tmp[p.name] = path.resolve(__dirname, p.file)
	);
	out.entry = tmp;
	
	var tmp2 = new Array();

	pages.forEach(p => {
		tmp2.push(
			new HtmlWebpackPlugin({
				title: p.title,
				filename: p.url,
				chunksSortMode: none,
				chunks: [ p.name ], //ch,
				template: path.resolve(__dirname, 'src/common/templates/'+p.template)
			})
		);
	});
	out.plugins = tmp2;
	
	return out;
};

module.exports = merge(staticConfig, dynamicConfig(pages));