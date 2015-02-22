'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'collections/QuestionCollection'
], function (_, Backbone, BaseModel) {

    var TestModel = BaseModel.extend({

        initialize: function() {
        },

        defaults: {
            id: 0,
            title: '',
            questions: [],
            solution: {}
        },

        parse: function(response)  {
            response.questions = new QuestionCollection(response.questions);
            return response;
        },

        calculateResults: function(){
            console.log('calculation in progress...');
        }
    });

    return TestModel;
});
