'use strict';

define(function(require){
  var $ = require('jquery'),
      _ = require('underscore'),
      React = require('react'),
      reactBackbone = require('reactBackbone');

  //import the backbone mixins
  reactBackbone(React, Backbone, _, $); 

  //<ProgressBarComponent percentage={60} />
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
  
  return ProgressBarComponent;
});