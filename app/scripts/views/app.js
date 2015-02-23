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

    var QuestionsView = React.createClass({
      //mixins: [backboneMixin],   
      render: function () {
        var questions = this.props.collection || []; 
        return (
                <ul>
                    {questions.map(function(questionModel) {
                      return <li key={questionModel.get('id')}>
                                <p>{questionModel.get('title')}</p>
                                <p>{questionModel.get('text')}</p>
                                <OptionsView model={questionModel}/>
                             </li>;
                    })}
                </ul>
        );
      }
    });

    var OptionsView = React.createClass({ 
      //mixins: [backboneMixin],
      render: function () {
        var RadioGroup = Backbone.input.RadioGroup,
            questionModel = this.props.model,
            optionsCollection = this.props.model.get('options') || [];
        return (
          <RadioGroup name="selected" model={questionModel}>
            {optionsCollection.map(function(optionModel) {
                  return <OptionView id={questionModel.get('id')} model={optionModel} />    
            })}
          </RadioGroup>       
        );
      }
    });

    var OptionView = React.createClass({ 
      //mixins: [backboneMixin], 
      render: function () {
        var questionId = this.props.id
        var model = this.props.model;
        return (
                       <div className="radio">
                        <label>
                          <input type="radio" name={questionId} id="optionsRadios{result.id}" value={model.get('id')}   />
                          {model.get('text')}
                        </label>
                      </div>
                );
      }
    });

    this.AppView = React.createClass({
      mixins: [backboneMixin],

      getInitialState: function() {
          return {
              step: 'test'
          };
      },

      doResults: function() {
          this.props.doCalculation();
          this.setState({
              step: 'results'
          });
      },

      render: function () {
        if(this.state.step==='test'){
          return (
            <section className="panel panel-primary">
              <header className="panel-heading">
                <h3 className="panel-title">Test: {this.props.title}</h3>
              </header>
              <article className="panel-body">
                    <QuestionsView collection={this.props.questions} />
              </article>
              <footer className="panel-footer">
                <button type="button" className="btn btn-danger">Reset</button>
                <button type="button" className="btn btn-success" onClick={this.doResults}>Complete Test</button>
              </footer>
            </section>
          );
        }else{
          return (
            <section className="panel panel-primary">
              <header className="panel-heading">
                <h3 className="panel-title">Test: {this.props.title}</h3>
              </header>
              <article className="panel-body">
              results
              </article>
              <footer className="panel-footer">

              </footer>
            </section>
          );
        }
        
      }
    });

  }


  App.prototype.render = function () {
    // Normally i use model.fetch() but in this case i cant use an ajax call because of the cross-domain policy
    var model = new TestModel(JSON.parse(json));
    console.log(model);
        
    //closure to apply callback on react change state. 
    var doCalculation = function(){
      model.calculateResults();
    };

    React.render(<this.AppView model={model} doCalculation={doCalculation} />, $('#main-content')[0]);
  };

  return App;

});