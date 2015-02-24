'use strict';

/* This file is for defining all  globals methos and variables */

define(function(require){
  var $ = require('jquery'),
      _ = require('underscore'),
      TestModel = require('models/TestModel'),
      json = require('text!vendor/test.json');


    var global  = (function(){
		/* ****** Privates ******* */
		
		// Normally i use model.fetch() but in this case i cant use an ajax call because of the cross-domain policy
    	var testModel = new TestModel(JSON.parse(json));

		/* ****** Reveal Globals ******* */
		return {
			testModel: testModel // I add the model to global to always use the same instance. 
		};

	})();

    return global;
});



