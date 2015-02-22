'use strict';

define([
    'underscore',
    'backbone',
    'collections/BaseCollection',
    'models/QuestionModel',
    'collections/OptionsCollection'
], function (_, Backbone, BaseCollection,QuestionModel,OptionsCollection) {

    var QuestionCollection = BaseCollection.extend({

        model: QuestionModel,

        initialize: function() {
        }

    });

    return QuestionCollection;
});
