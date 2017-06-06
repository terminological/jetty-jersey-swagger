/**
 * Module exports entry points
 */

module.exports = [
		{
			name: 'index',
			url: 'index.html',
			title: 'Index',
			template: 'basic-page.ejs',
			file: './src/index/index.js'
		},
		{
			name: 'about',
			url: 'about.html',
			title: 'About this site',
			template: 'basic-page.ejs',
			file: './src/about/index.js'
		},
		{
			name: 'd3csv',
			url: 'd3csv.html',
			title: 'Demo of D3 using CSV',
			template: 'basic-page.ejs',
			file: './src/d3csv/index.js'
		},
];
