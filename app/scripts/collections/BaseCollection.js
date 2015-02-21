'use strict';

define([
    'underscore',
    'backbone',
    'models/BaseModel'
], function (_, Backbone, BaseModel) {

    var BaseCollectionCollection = Backbone.Collection.extend({
        model: BaseModel
    });

    return BaseCollectionCollection;
});
