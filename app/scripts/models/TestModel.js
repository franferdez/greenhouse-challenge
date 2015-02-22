'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'collections/QuestionCollection'
], function (_, Backbone, BaseModel,QuestionCollection) {

    var TestModel = BaseModel.extend({

        initialize: function() {
        },

        defaults: {
            id: 0,
            title: '',
            questions: {},
            solution: {}
        },

        parse: function(response)  {
            console.log('response',response);
            response.questions = new QuestionCollection(response.questions);
            console.log('response',response);
            return response;
        },

        calculateResults: function(){
            console.log('calculation in progress...');
        }
    });

    return TestModel;
});
