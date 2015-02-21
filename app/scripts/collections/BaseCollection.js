/*global define*/

define([
    'underscore',
    'backbone',
    'models/BaseCollection'
], function (_, Backbone, BaseCollectionModel) {
    'use strict';

    var BaseCollectionCollection = Backbone.Collection.extend({
        model: BaseCollectionModel
    });

    return BaseCollectionCollection;
});
