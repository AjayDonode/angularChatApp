module.exports = function(app){
	'use strict';
	/*GET users Listing*/
	console.log('==================================');
	console.log('========: Services are Up :=======');
	console.log('==================================');
	
	//test Service 
	app.get('/api/test', function(req,res){
  		return res.send("<h4>Ping Ping ! <br>Its working </h4>");
	});


	app.post('/auth/authenticate', function(req, res) {
		AuthUser.findOne({email: req.body.email, password: req.body.password}, function(err, authUser) {
	        if (err) {
	            res.json({
	                type: false,
	                data: "Error occured: " + err
	            });
	        } else {
	            if (authUser) {
	               res.json({
	                    type: true,
	                    data: authUser,
	                    token: authUser.token
	                }); 
	            } else {
	                res.json({
	                    type: false,
	                    data: "Incorrect email/password"
	                });    
	            }
	        }
	    });
	});

	app.put('/auth/register', function(req,res){
		
		var user = new AuthUser({
						"email": req.body.email,
						"username" : req.body.username,
						"password" : req.body.password,
						"phone" : req.body.phone,
						"profession" : req.body.profession,
						"age": req.body.age
					});

		user.save(function (err) {
				if (!err) {
				return console.log("created");
				} else {
				return console.log(err);
				}
			});
		return res.send(user);
		});

	//get list of all users
	app.get('/api/users', function(req,res){
		return Usermodel.find(function (err, users) {
			if (!err) {
			return res.send(users);
			} else {
			return console.log(err);
			}
		});
	});

	//get user with id
	app.get('/api/users/:id', function(req,res){
		return Usermodel.findById(req.params.id, function (err, user) {
		if (!err) {
			return res.send(user);
		} else {
			return console.log(err);
		}
		});
	});

	//Put User 
	app.put('/api/users', function(req,res){
	
	var user = new Usermodel({
					"username" : req.body.username,
					"password" : req.body.password,
					"profession" : req.body.profession,
					"age": req.body.age
				});

	user.save(function (err) {
			if (!err) {
			return console.log("created");
			} else {
			return console.log(err);
			}
		});
	return res.send(user);
	});

	//Update User data 
	app.put('/api/users/:id', function (req, res){
	  return Usermodel.findById(req.params.id, function (err, user) {
	    user.username = req.body.username;
	    user.password = req.body.password;
	    user.profession = req.body.profession;
	    user.age = req.body.age;
	    return user.save(function (err) {
	      if (!err) {
	        console.log("updated");
	      } else {
	        console.log(err);
	      }
	      
	    });
	  });
	});

	//Delete user 
	app.delete('/api/users/:id', function (req, res){
	  return Usermodel.findById(req.params.id, function (err, user) {
	    return user.remove(function (err) {
	      if (!err) {
	        console.log("removed");
	        return res.send('');
	      } else {
	        console.log(err);
	      }
	    });
	  });
	});

	app.post('/api/login', function(req,res){
		return Usermodel.find({ "username": req.body.username , "password": req.body.password }, function (err, user) {
				if (!err) {
				console.log(user);
                 console.log("Found User with Name ");
              } else {
              		console.log("Error : "+ err);
              }
              return res.send(user);
		}); 
	});

}