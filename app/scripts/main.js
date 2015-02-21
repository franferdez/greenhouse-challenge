/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        react: {
          exports: 'React'
        },
        JSXTransformer: 'JSXTransformer'
    },
    paths: {
        g: 'global',
        routes: 'routes',
        views: 'views',
        templates: 'templates',
        models: 'models',
        collections: 'collections',
        vendor: 'vendor',
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        react: '../bower_components/react/react-with-addons',
        JSXTransformer: '../bower_components/react/JSXTransformer',
        jsx: '../bower_components/requirejs-react-jsx/jsx',
        text: '../bower_components/requirejs-text/text'
    },
    jsx: {
        fileExtension: ".js",
        transformOptions: {
          harmony: true,
          stripTypes: false
        },
        usePragma: false
    }
});

require([
    'g',
    'backbone',
    'jsx!views/app',
    'models/TestModel',
    'text!vendor/test.json'
], function (g,Backbone,App,TestModel,json) {
    Backbone.history.start();
    var app = new App();
    app.render();

    // Normally i use model.fetch() but in this case i cant use an ajax call because of the cross-domain policy
    var model = new TestModel(JSON.parse(json));
    
});
