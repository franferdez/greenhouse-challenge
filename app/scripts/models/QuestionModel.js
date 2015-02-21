'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel'
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
    });

    return QuestionModel;
});
