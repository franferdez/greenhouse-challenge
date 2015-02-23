'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'collections/QuestionCollection'
], function (_, Backbone, BaseModel,QuestionCollection) {

    var TestModel = BaseModel.extend({

        initialize: function() {
            this.set('questions', new QuestionCollection(this.get('questions')));
        },

        defaults: {
            id: 0,
            title: '',
            questions: [],
            solution: {}
        },

        calculateResults: function(){
            console.log('calculation in progress...');
            var questions = this.get('questions').models,
                value = 0;

            for (var i = 0, len = questions.length ; i < len; i += 1) {
                var options = questions[i].get('options').models;
                console.log('selected',questions[i].get('selected'));
            }
        }
    });

    return TestModel;
});
