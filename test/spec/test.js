'use strict';

define(function(require) {

  	var TestModel = require('models/TestModel'),
  		QuestionModel = require('models/QuestionModel'),
  		OptionModel = require('models/OptionModel'),
  		QuestionCollection = require('collections/QuestionCollection'),
  		OptionsCollection = require('collections/OptionsCollection'),
  		json = require('text!vendor/test.json');

	describe('TestModel', function () {

		 describe('constructor', function() {
	 
	        it('should exist', function() {
	            expect(TestModel).to.exist;
	        });
	 
	        it('should be an instance of TestModel', function() {
				var model = new TestModel(JSON.parse(json));
	            expect(model).to.be.an.instanceof(TestModel);
	        });

	        it('should be an instance of QuestionCollection', function() {
				var model = new TestModel(JSON.parse(json));
	            expect(model.get('questions')).to.be.an.instanceof(QuestionCollection);
	        });

	        it('should get a particular Question', function() {
				var model = new TestModel(JSON.parse(json));
	            expect(model.get('questions').get('QUES-1')).to.be.an.instanceof(QuestionModel);
	        });
	        
	        it('should get a instance of OptionsCollection', function() {
				var model = new TestModel(JSON.parse(json));
	            expect(model.get('questions').get('QUES-1').get('options')).to.be.an.instanceof(OptionsCollection);
	        });

	        it('should get a particular OptionModel', function() {
				var model = new TestModel(JSON.parse(json));
	            expect(model.get('questions').get('QUES-1').get('options').get('ANSW-2')).to.be.an.instanceof(OptionModel);
	        });

	        it('OptionModel should have checked field', function() {
				var model = new TestModel(JSON.parse(json));
	            expect(model.get('questions').get('QUES-1').get('options').get('ANSW-2').attributes.checked).to.exist;
	        });
	 
	    });
	    describe("calculateResults", function() {
	    	it("if you dont choose nothing should add 0 points to the final score"), function(){
	    		var model = new TestModel(TestModel.prototype.parse(JSON.parse(json))),
		     		result = model.calculateResults();
		     	expect(result).to.equal(0);
	    	}
		    it("pick ANSW-1 of QUES-1, it should add 40 points to the final score", function() {
		     	var model = new TestModel(TestModel.prototype.parse(JSON.parse(json))),
		     		questions = model.get('questions').get('QUES-1').get('options').get('ANSW-1').set('checked',true),
		     		result = model.calculateResults();
		     	expect(result).to.equal(40);
		    });
		 
		    it("if you pick ANSW-2 of QUES-1, it should add 4 points to the final score", function() {
		    	var model = new TestModel(TestModel.prototype.parse(JSON.parse(json))),
		     		questions = model.get('questions').get('QUES-1').get('options').get('ANSW-2').set('checked',true),
		     		result = model.calculateResults();
		     	expect(result).to.equal(4);

		    });
	    });
    });
});