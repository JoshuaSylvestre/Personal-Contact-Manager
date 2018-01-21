const User = require('../models/user'); // Import User Model Schema

module.exports = (router) => 
{
	router.post('/register', (req, res) => {
		// Check for email
		if(!req.body.email)
		{
			res.json({ success: false, message: 'You must provide an e-mail'});
		}else
		{ 
			// Check for username
			if(!req.body.username)
			{
				res.json({ success: false, message: 'You must provide a username'});
			}else 
			{
				// Check for password
				if(!req.body.password)
				{
					res.json({ success: false, message: 'You must provide a password'});
				}else
				{
					let user = new User(
					{
						email: req.body.email.toLowerCase(),
						username: req.body.username.toLowerCase(),
						password: req.body.password
					});

					user.save((err) =>
					{
						if (err) {
			              // Check if error is an error indicating duplicate account
			              if (err.code === 11000) {
			                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
			              } else {
			                // Check if error is a validation rror
			                if (err.errors) {
			                  // Check if validation error is in the email field
			                  if (err.errors.email) {
			                    res.json({ success: false, message: err.errors.email.message }); // Return error
			                  } else {
			                    // Check if validation error is in the username field
			                    if (err.errors.username) {
			                      res.json({ success: false, message: err.errors.username.message }); // Return error
			                    } else {
			                      // Check if validation error is in the password field
			                      if (err.errors.password) {
			                        res.json({ success: false, message: err.errors.password.message }); // Return error
			                      } else {
			                        res.json({ success: false, message: err }); // Return any other error not already covered
			                      }
			                    }
			                  }
			                } else {
			                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
			                }
			              }
						}else{
							res.json({ success: true, message: 'Account registered!'});
						}
					});

					// user.save((err)=>
					// {
					// 	if(err)
					// 	{
					// 		// if(err.code == 11000) // this 11000 is the dupli. error code
					// 		// {
					// 		// 	res.json({ success: false, message: 'Username or e-mail already exists'});
					// 		// }
					// 		// else
					// 		// {
					// 		// 	if(err.errors)
					// 		// 	{
					// 		// 		if(err.errors.email) // mean the validation didn't pass for this one( 5 < email < 30 chars )
					// 		// 		{
					// 		// 			res.json({ success: false, message: err.errors.email.message});
					// 		// 		}
					// 		// 	}else
					// 		// 	{
					// 		// 		res.json({ success: false, message: 'Could not save user. Error: ',err});
					// 		// 	}
					// 		// }

					// 		console.log(err);
					// 	}



					// 	else
					// 	{
					// 		res.json({ success: true, message: 'User is saved'});
					// 	}
					// });
				}
			}
		}
	});	

	return router;
}