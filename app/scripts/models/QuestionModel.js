'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'collections/OptionsCollection'
], function (_, Backbone, BaseModel) {

    var QuestionModel = BaseModel.extend({

        initialize: function() {
        },

        defaults: {
            id: 0,
            title: '',
            text: '',
            options: {}
        },

        parse: function(response)  {
            response.options = new OptionsCollection(response.options);
            return response;
        }
    });

    return QuestionModel;
});
