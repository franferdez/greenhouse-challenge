'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel',
    'collections/OptionsCollection'
], function (_, Backbone, BaseModel) {

    var OptionModel = BaseModel.extend({

        initialize: function() {
        },

        defaults: {
            id: 0,
            text: '',
            checked: false
        }
    });

    return OptionModel;
});
