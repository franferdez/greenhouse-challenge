'use strict';

define(function(require){
  var $ = require('jquery');
  var React = require('react');
  var TestModel = require('models/TestModel');
  var json = require('text!vendor/test.json');
  var backboneMixin = require('backboneMixin');

  function App() {


    var QuestionsView = React.createClass({   
      render: function () {
        var questions = this.props.questions || []; 
        return (
                <ul>
                    {questions.map(function(result) {
                      return <li key={result.id}>
                                <p>{result.title}</p>
                                <p>{result.text}</p>
                                <OptionsView options={result.options} />
                             </li>;
                    })}
                </ul>
        );
      }
    });

    var OptionsView = React.createClass({   
      render: function () {
        var options = this.props.options || [];
        return (
                <ul>
                    {options.map(function(result) {
                      return <li key={result.id}>
                                <p>{result.text}</p>
                             </li>;
                    })}
                </ul>
        );
      }
    });

    this.AppView = React.createClass({
      mixins: [backboneMixin],
      render: function () {
        return (
            <section className="panel panel-primary">
              <header className="panel-heading">
                <h3 className="panel-title">Test: {this.props.title}</h3>
              </header>
              <article className="panel-body">
                    <QuestionsView questions={this.props.questions} />
              </article>
            </section>
        );
      }
    });


  }


  App.prototype.render = function () {
    // Normally i use model.fetch() but in this case i cant use an ajax call because of the cross-domain policy
    var model = new TestModel(JSON.parse(json));
    console.log(model.toJSON());
    React.render(<this.AppView model={model} />, $('#main-content')[0]);
  };

  return App;

});