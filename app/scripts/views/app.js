'use strict';

define(function(require){
  var React = require('react');
  var TestModel = require('models/TestModel');
  var json = require('text!vendor/test.json');
  var backboneMixin = require('backboneMixin');

  function App() {
    this.AppView = React.createClass({
      mixins: [backboneMixin],
      render: function () {
        return (
          <div>
            <p>Test: {this.props.title}</p>
          </div>
        );
      }
    });
  }

  App.prototype.render = function () {

    // Normally i use model.fetch() but in this case i cant use an ajax call because of the cross-domain policy
    var model = new TestModel(JSON.parse(json));
    console.log(model.toJSON());
    React.renderComponent(<this.AppView model={model} />, document.body);
  };

  return App;

});