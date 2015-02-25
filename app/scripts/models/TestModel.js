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
            id: '',
            title: '',
            questions: [],
            solution: {},
            total: 0
        },

        calculateResults: function(){
            var questions = this.get('questions').models,
                acum = 0,
                points = 0,
                pointsPercentage = 0,
                question = {},
                solution = {},
                correctAnswer = '';

            // for sentence have better performance 
            for (var i = 0, len = questions.length ; i < len; i += 1) {
                question = questions[i];
                solution  = this.get('solution')[question.get('id')];
                pointsPercentage = solution.answers[question.get('selected')] || 0;
                question.set('pointsPercentage',pointsPercentage);
                    
                //cross-multiplication to calculate the points
                points = (solution.value * pointsPercentage / 100) ;
                question.set('points',points);
                acum = acum + points;

                // calculate the correct answer
                // underscore methods have better readability
                question.set('correctAnswer',_.invert(solution.answers)[100]);

            }
            this.set('total', acum);
        }
    });

    return TestModel;
});
