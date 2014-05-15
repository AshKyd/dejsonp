var Sandbox = require('sandbox');
var s = new Sandbox();

var tryParse = function(json,callback){
	try{
		callback(null, JSON.parse(json));
	} catch(e) {
		callback('Malformed JSON.');
	}
}

var execJsonp = function(jsonp, callbackName, callback){
	var glorp = jsonp+';function '+callbackName+'(a){return JSON.stringify(a);}';
	s.run(glorp,function(output){
		if(output.result == 'null'){
			callback('Callback did nothing.');
		} else {
			tryParse(output.result.substr(1,output.result.length-2),callback);
		}
	});
}


/**
 * Parse a JSONp string as JSON using a string manipulation method.
 * @param  {string}   jsonp        Input JSONp string.
 * @param  {string}   callbackName Name of the JSONp callback. Leave this out to guess it. 
 * @param  {Function} callback     Callback when done.
 */
var dejsonp_exec = function(jsonp, callbackName, callback){
	if(typeof callbackName == 'string'){
		// The callback was specified, use that.
		execJsonp(jsonp, callbackName, callback);
	} else {
		if(typeof callbackName == 'function'){
			callback = callbackName;
		}
		// Execute the function without a callback. This will throw a x is not
		// defined message we can get the callback from.
		s.run(jsonp,function(output){
			callbackName = output.result.replace(/.*\s([^\s]+) is not defined.*/, '$1');
			if(!callbackName){
				callback("Can't determine callback name. Specify it manually.");
			} else {
				execJsonp(jsonp, callbackName, callback);
			}
		});
	}
}

/**
 * Parse a JSONp string as JSON using a string manipulation method.
 * @param  {string}   jsonp    Input JSONp string.
 * @param  {Function} callback Callback when done.
 */
var dejsonp_string = function(jsonp, callback){
	// Regex matches the first array or object it can. No guarantee this
	// is any good.
	var json = jsonp.match(/[^{\[]+({.*}|\[.*\])+[^}]+/);
	if(!json || json.length != 2){
		callback('Could not match JSON');
		return;
	}
	json = json[1];
	tryParse(json,callback);
}

module.exports = {
	exec: dejsonp_exec,
	guess: dejsonp_string
};