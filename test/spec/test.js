'use strict';

define(function(require) {

  	var TestModel = require('scripts/models/TestModel.js');
  	var TestModel = require('scripts/models/TestModel.js');
  	var TestModel = require('scripts/models/TestModel.js');
  	var json = require('text!vendor/test.json');

	describe('TestModel', function () {
	    describe("calculateResults", function() {
		    it("pick ANSW-1 of QUES-1, it should add 40 points to the final score", function() {
		     	var model = new TestModel(JSON.parse(json));
		     	model.questions.get(0).options.get(0).set('checked',true);
		     	var  result = model.calculateResults();
		     	expect(result).to.equal(40);
		    });
		 
		    it("if you pick ANSW-2 of QUES-1, it should add 4 points to the final score", function() {

		    });
	    });
    });
});