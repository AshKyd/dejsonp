dejsonp
=======
Little thing to parse JSONp to JSON.

There are two usage modes: exec and guess.

1. Exec mode executes the jsonp in a sandbox and is useful for when the jsonp
   container contains regular JS syntax.
2. Guess mode attempts to strip the jsonp callback from the string and parse it
   with JSON.parse.

Usage
-----

To use the execute mode, use this syntax:

	dejsonp.exec(myJsonpString,'callbackName',function(err, result){
		if(err){
			throw err;
		}
		console.log(resultObj)
	});

If you don't know what the callback name is, leave it out, and dejsonp will try
to guess it based on the error thrown in the sandbox when the script is executed.

	dejsonp.exec(myJsonpString,function(err, result){
		if(err){
			throw err;
		}
		console.log(resultObj)
	});

If you know your jsonp is well formed, you can use guess mode which is probably
more secure but more likely to break on malformed jsonp.

	dejsonp.guess(myJsonpString,function(err, result){
		if(err){
			throw err;
		}
		console.log(resultObj)
	});