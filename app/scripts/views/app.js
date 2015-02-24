'use strict';

define(function(require){
  var $ = require('jquery'),
      _ = require('underscore'),
      React = require('react'),
      reactBackbone = require('reactBackbone'), 
      TestModel = require('models/TestModel'),
      json = require('text!vendor/test.json'),
      TestView = require('jsx!views/TestView');

  //import the backbone mixins
  reactBackbone(React, Backbone, _, $);

  function App() {

    var LandingView = React.createClass({ 
      render: function (){ 
        return ( 
          <section className="jumbotron">
              <h1>Hello!</h1>
              <button type="button" className="btn btn-primary" onClick={this.props.startTest}>Click to Start the Test</button>
          </section>
        );
      }
    });

    this.AppView = React.createClass({
      getInitialState: function() {
          return {
              step: 'initial'
          };
      },

      startTest: function(){
          this.setState({
              step: 'test'
          });
      },

      doResults: function() {
          this.props.doCalculation();
          this.setState({
              step: 'results'
          });
      },

      render: function () {
        if(this.state.step==='initial'){
          return (<LandingView state={this.state} startTest={this.startTest} />);    
        }else{
          return (<TestView model={this.props.model} step={this.state.step} doResults={this.doResults} />);
        }
      }
    });

  }


  App.prototype.render = function () {
    // Normally i use model.fetch() but in this case i cant use an ajax call because of the cross-domain policy
    var model = new TestModel(JSON.parse(json));
        
    //closure to apply callback on react change state. 
    var doCalculation = function(){
      model.calculateResults();
    };

    React.render(<this.AppView model={model} doCalculation={doCalculation} />, $('#main-content')[0]);
  };

  return App;

});