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
        name: 'test',
        url: 'test.html',
        title: 'About this site',
        template: 'basic-page.ejs',
        file: './src/test/index.js'
    },
    {
        name: 'lit-rev',
        url: 'lit-rev.html',
        title: 'PhD Literature Review copy',
        template: 'basic-page.ejs',
        file: './src/docs/lit-rev.js'
    },
    {
        name: 'de-identification-protocol',
        url: 'de-identification-protocol.html',
        title: 'De-identification study protocol',
        template: 'basic-page.ejs',
        file: './src/copyright/figures/de-identification-protocol.js'
    },
    {
        name: 'gulshan-fig-2',
        url: 'gulshan-fig-2.html',
        title: 'Gulshan et al 2016 Figure 2',
        template: 'basic-page.ejs',
        file: './src/copyright/figures/gulshan-fig-2.js'
    },
    {
        name: 'machine-learning-methods',
        url: 'machine-learning-methods.html',
        title: 'Machine learning methods',
        template: 'basic-page.ejs',
        file: './src/copyright/figures/machine-learning-methods.js'
    },
    {
        name: 'ml-protocol',
        url: 'ml-protocol.html',
        title: 'Main machine learning protocol',
        template: 'basic-page.ejs',
        file: './src/copyright/figures/ml-protocol.js'
    },
];
