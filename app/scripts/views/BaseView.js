'use strict';

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone, JST) {
    
    var BaseViewView = Backbone.View.extend({
        //template: JST['app/scripts/templates/BaseView.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }
    });

    return BaseViewView;
});
