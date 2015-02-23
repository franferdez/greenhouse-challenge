'use strict';

define(function(require){
  var $ = require('jquery');
  var _ = require('underscore');
  var React = require('react');
  var TestModel = require('models/TestModel');
  var json = require('text!vendor/test.json');
  var backboneMixin = require('backboneMixin');
  var reactBackbone = require('reactBackbone');

  //import the backbone mixins
  reactBackbone(React, Backbone, _, $);

  function App() {

    var ProgressBarComponent =  React.createClass({

        getInitialState: function() {
          return {percentage: 0};
        },

        handleIncrement: function(){
          console.log('percentage',this.state.percentage,this.props.percentage);
          if(this.state.percentage <  this.props.percentage){
            this.setState({percentage: this.state.percentage + 1});
          }
        },

        componentDidMount: function(){
            var _this =  this;
            setTimeout(function(){
               _this.setState({
                percentage: _this.props.percentage
              });
            },1000);
           
        },
        
        render: function(){
          var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
          var percentage = this.props.percentage;

          return(
            <ReactCSSTransitionGroup transitionName="bar">
            <div className="progress">
              <div className="progress-bar" role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" style={{width : this.state.percentage+'%'}}>
                {this.state.percentage + '%'}
              </div>
            </div>
            </ReactCSSTransitionGroup>
          );
        }
    });

    var QuestionsView = React.createClass({
      render: function () {
        var step = this.props.step;
        var questions = this.props.collection || []; 
        return (
                <ul>
                    {questions.map(function(questionModel) {
                      return <li key={questionModel.get('id')}>
                                <p>{questionModel.get('title')}</p>
                                <p>{questionModel.get('text')}</p>
                                <OptionsView model={questionModel} step={step}/>
                                <ProgressBarComponent percentage={60} />
                             </li>;
                    })}
                </ul>
        );
      }
    });

    var OptionsView = React.createClass({ 
      mixins: ['modelAware'],
      render: function () {
        var RadioGroup = Backbone.input.RadioGroup,
            questionModel = this.props.model,
            optionsCollection = this.props.model.get('options') || [];
        return (
          <RadioGroup name="selected" model={questionModel} bind={true}>
            {optionsCollection.map(function(optionModel) {
                  return <OptionView id={questionModel.get('id')} model={optionModel} />    
            })}
          </RadioGroup>       
        );
      }
    });

    var OptionView = React.createClass({ 
      render: function () {
        var questionId = this.props.id
        var model = this.props.model;
        return (
            <div className="radio">
              <label>
                <input type="radio" name={'radio' + questionId} value={model.get('id')} />
                {model.get('text')}
              </label>
            </div>
        );
      }
    });

    var TestView = React.createClass({ 
      render: function (){
        var model = this.props.model;

        var partial;
        if(this.props.step === 'test'){
          partial = <footer className="panel-footer">
                      <button type="button" className="btn btn-danger">Reset</button>
                      <button type="button" className="btn btn-success" onClick={this.props.doResults}>Complete Test</button>
                    </footer>
        }

        return ( 
          <section className="panel panel-primary">
              <header className="panel-heading">
                <h3 className="panel-title">Test: {model.get('title')}</h3>
              </header>
              <article className="panel-body">
                    <QuestionsView collection={model.get('questions')} state={this.state} />
              </article>
              {partial}
          </section>
        );
      }
    });

    var LandingView = React.createClass({ 
      render: function (){ 
        return ( 
          <section className="jumbotron">
              <h1>Hello!</h1>
              <button type="button" className="btn btn-primary" onClick={this.props.startTest}>Start Test</button>
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