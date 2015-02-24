'use strict';

define(function(require){
  var $ = require('jquery'),
      _ = require('underscore'),
      g = require('global'),
      React = require('react'),
      reactBackbone = require('reactBackbone'), 
      TestView = require('jsx!views/TestView');

  //import the backbone mixins
  reactBackbone(React, Backbone, _, $);

  function App() {
    var model = g.testModel;
    
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
          return (<TestView step={this.state.step} model={model} doResults={this.doResults} />);
        }
      }
    });

  }


  App.prototype.render = function () {
    var model = g.testModel;
        
    //closure to apply callback on react change state. 
    var doCalculation = function(){
      g.testModel.calculateResults();
    };

    React.render(<this.AppView model={model} doCalculation={doCalculation} />, $('#main-content')[0]);
  };

  return App;

});