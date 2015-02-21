'use strict';

define([
    'underscore',
    'backbone',
    'collections/BaseCollection',
    'models/QuestionModel'
], function (_, Backbone, BaseCollection,QuestionModel) {

    var QuestionCollection = BaseCollection.extend({

        model: QuestionModel,

        initialize: function() {
        },

    });

    return QuestionCollection;
});
