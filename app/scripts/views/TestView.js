'use strict';

define(function(require){

  var $ = require('jquery'),
      _ = require('underscore'),
      React = require('react'),
      reactBackbone = require('reactBackbone'), 
      ProgressBarComponent = require('jsx!components/ProgressBarComponent');

    //import the backbone mixins
    reactBackbone(React, Backbone, _, $);    

    var QuestionsView = React.createClass({
      render: function () {
        var step = this.props.step;
        var questions = this.props.collection || [];         
        return (
                <ul>
                    {questions.map(function(questionModel) {
                      return <QuestionView model={questionModel} step={step} />;
                    })}
                </ul>
        );
      }
    });

    var QuestionView = React.createClass({
      render: function () {
        var step = this.props.step;
        var model = this.props.model;
        var partial = {};

        if(step==='results'){
          partial = <ProgressBarComponent percentage={model.get('pointsPercentage')} />
        }
        return (<li key={model.get('id')}>
                                <h3>{model.get('title')}</h3>
                                <h4>{model.get('text')}</h4>
                                <OptionsView model={model} step={step}/>
                                {partial}
                             </li>);
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
                  return <OptionView parent={questionModel}  model={optionModel} step={step} />    
            })}
          </RadioGroup>       
        );
      }
    });

    var OptionView = React.createClass({ 
      render: function () {
        var questionId = this.props.parent.get('id'),
            model = this.props.model,
            step = this.props.step,
            status = '',
            partial = {};

        if(step === 'results'){
            // if we are in results step
            if(this.props.parent.get('correctAnswer') === model.get('id')){
              //highlight the correct answer
              status = ' bg-success';
              partial = <span className="glyphicon glyphicon-ok" aria-hidden="true" />; 
            }else{
              if(this.props.parent.get('selected') === model.get('id')){
                //highlight the wrong answer
                status = ' bg-danger';
                partial = <span className="glyphicon glyphicon-remove" aria-hidden="true" />;
              }
            }
        }

        return (
            <div className={'radio' + status}>
              <label>
                <input type="radio" name={'radio' + questionId} value={model.get('id')} disabled={step === 'results'? 'disabled': ''}/>
                {model.get('text')}
              </label>
              {partial}
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

    return TestView;
});
