'use strict';

define(function(require){
  var $ = require('jquery'),
      _ = require('underscore'),
      React = require('react'),
      reactBackbone = require('reactBackbone'), 
      TestModel = require('models/TestModel'),
      json = require('text!vendor/test.json'),
      ProgressBarComponent = require('jsx!components/ProgressBarComponent');

  //import the backbone mixins
  reactBackbone(React, Backbone, _, $);

  function App() {

    var QuestionsView = React.createClass({
      render: function () {
        var step = this.props.step;
        var questions = this.props.collection || []; 
        var partial = {}
        if(step==='results'){
          partial = <ProgressBarComponent percentage={60} />
        }
        return (
                <ul>
                    {questions.map(function(questionModel) {
                      return <li key={questionModel.get('id')}>
                                <p>{questionModel.get('title')}</p>
                                <p>{questionModel.get('text')}</p>
                                <OptionsView model={questionModel} step={step}/>
                                {partial}
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
            optionsCollection = this.props.model.get('options') || [],
            step = this.props.step;
        return (
          <RadioGroup name="selected" model={questionModel} bind={true}>
            {optionsCollection.map(function(optionModel) {
                  return <OptionView id={questionModel.get('id')} model={optionModel} step={step} />    
            })}
          </RadioGroup>       
        );
      }
    });

    var OptionView = React.createClass({ 
      render: function () {
        var questionId = this.props.id,
            model = this.props.model,
            step = this.props.step;

        return (
            <div className="radio">
              <label>
                <input type="radio" name={'radio' + questionId} value={model.get('id')} disabled={step === 'results'?'disabled':''}/>
                {model.get('text')}
              </label>
            </div>
        );
      }
    });

    var TestView = React.createClass({ 
      render: function (){
        var model = this.props.model;

        var partial = {};
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
                    <QuestionsView collection={model.get('questions')} step={this.props.step} />
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