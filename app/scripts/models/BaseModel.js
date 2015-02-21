'use strict';

define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var BaseModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    return BaseModel;
});
