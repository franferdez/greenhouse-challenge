'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'collections/OptionsCollection'
], function (_, Backbone, BaseModel,OptionsCollection) {

    var QuestionModel = BaseModel.extend({

        initialize: function() {
            this.set('options', new OptionsCollection(this.get('options')));
        },

        defaults: {
            id: '',
            title: '',
            text: '',
            selected: '', 
            options: []
        }
    });

    return QuestionModel;
});
