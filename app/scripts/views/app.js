'use strict';

define(function(require){
  var $ = require('jquery');
  var React = require('react');
  var TestModel = require('models/TestModel');
  var json = require('text!vendor/test.json');
  var backboneMixin = require('backboneMixin');

  function App() {


    var QuestionsView = React.createClass({
      mixins: [backboneMixin],   
      render: function () {
        var questions = this.props.collection || []; 
        return (
                <ul>
                    {questions.map(function(result) {
                      return <li key={result.id}>
                                <p>{result.title}</p>
                                <p>{result.text}</p>
                                <OptionsView  id={result.id} collection={result.options} />
                             </li>;
                    })}
                </ul>
        );
      }
    });

    var OptionsView = React.createClass({ 
      mixins: [backboneMixin],  
      render: function () {
        var questionId = this.props.id
        var options = this.props.collection || [];
        return (
                <ul>
                    {options.map(function(result) {
                      return <li key={result.id}>
                                 <div className="radio">
                                  <label>
                                    <input type="radio" name={questionId} id="optionsRadios{result.id}" value={result.id} checked={result.checked} />
                                    {result.text}
                                  </label>
                                </div>
                            </li>;
                    })}
                </ul>
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