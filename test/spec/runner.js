'use strict';
console.log('require test');
require.config({
    baseUrl: 'scripts/',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        text: '../bower_components/requirejs-text/text'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});
 
var specs = [
    'spec/test.js'
];
 
require(specs, function() {
    mocha.run();
});