var expect = require('expect.js');
var dejsonp = require('../index.js');
var fs = require('fs');
var somejson = fs.readFileSync(__dirname+'/bigjsonfile.json');
var somejsonpArray = 'callback(['+somejson+']);';
var somejsonpObject = 'callback({"jsonpobj":'+somejson+'});';

describe('dejsonp_exec', function(){
	it('Parses JSONp array',function(done){
		dejsonp.exec(somejsonpArray,'callback',function(err, result){
			expect(err).to.be(null);
			expect(typeof result).to.be('object');
			done();
		});
	});
	it('Parses JSONp object',function(done){
		dejsonp.exec(somejsonpObject,'callback',function(err, result){
			expect(err).to.be(null);
			expect(typeof result).to.be('object');
			done();
		});
	});
	it('Parses big amounts of JSONp in a sandbox',function(done){
		dejsonp.exec(somejsonpObject,'callback',function(err, result){
			expect(err).to.be(null);
			expect(typeof result).to.be('object');
			done();
		});
	});
	it('correctly guesses callback', function(done){
		dejsonp.exec(somejsonpObject,function(err, result){
			expect(err).to.be(null);
			expect(typeof result).to.be('object');
			done();
		});
	});
	it('Errors appropriately on no input', function(done){
		dejsonp.exec('',function(err, result){
			expect(typeof err).to.be('string');
			expect(result).to.be(undefined);
			done();
		});
	});
	it('Errors appropriately on bad callback', function(done){
		dejsonp.exec(somejsonpObject,'potato',function(err, result){
			expect(typeof err).to.be('string');
			expect(result).to.be(undefined);
			done();
		});
	});
	it('Errors appropriately on malformed input', function(done){
		dejsonp.exec('Cakes',function(err, result){
			expect(typeof err).to.be('string');
			expect(result).to.be(undefined);
			done();
		});
	});
	it('Errors appropriately on no input', function(done){
		dejsonp.exec('','',function(err, result){
			expect(typeof err).to.be('string');
			expect(result).to.be(undefined);
			done();
		});
	});
});

describe('dejsonp_guess', function(){
	it('Parses JSONp array',function(done){
		dejsonp.guess(somejsonpArray,function(err, result){
			expect(err).to.be(null);
			expect(typeof result).to.be('object');
			done();
		});
	});
	it('Parses JSONp object',function(done){
		dejsonp.guess(somejsonpObject,function(err, result){
			expect(err).to.be(null);
			expect(typeof result).to.be('object');
			done();
		});
	});
	it('Errors appropriately on no input', function(done){
		dejsonp.guess('',function(err, result){
			expect(typeof err).to.be('string');
			expect(result).to.be(undefined);
			done();
		});
	});
	it('Errors appropriately on malformed input', function(done){
		dejsonp.guess('Cakes',function(err, result){
			expect(typeof err).to.be('string');
			expect(result).to.be(undefined);
			done();
		});
	});
})