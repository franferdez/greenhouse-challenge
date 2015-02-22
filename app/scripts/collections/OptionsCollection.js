'use strict';

define([
    'underscore',
    'backbone',
    'collections/BaseCollection',
    'models/OptionModel'
], function (_, Backbone, BaseCollection,OptionModel) {

    var OptionsCollection = BaseCollection.extend({

        model: OptionModel,

        initialize: function() {
        }

    });

    return OptionsCollection;
});
