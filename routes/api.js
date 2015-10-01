module.exports = function(app){
	'use strict';
	/*GET users Listing*/
	console.log('==================================');
	console.log('========: Services are Up :=======');
	console.log('==================================');

	app.get('/api/test', function(req,res){
	res.send([
		{
			a:'b',
			b:'c'
		}]);

	});


	app.get('/api/ping', function(req,res){
	res.send('<H1>Hello User</H1>');
	});

}