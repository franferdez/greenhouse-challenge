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
                var question = questions[i],
                    solution  = this.get('solution')[question.get('id')],
                    //cross-multiplication
                    points = solution.value * solution.answers[question.get('selected')] / 100;

                    console.log('points', points);
            }
        }
    });

    return TestModel;
});
