const LocaLStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = ('../models/User');

module.exports = function (passport) {
	passport.use(
		new LocaLStrategy({	usernameField: 'email'}, (email, password, done) =>{
			User.findOne({
				email: email
			})
				.then(user => {
					if (!user) {
						return done(null, false, {
							message: 'Invalid email'
						});
					}

					bcrypt.compare(password, user.password, () => {
						if (err) throw err;

						if (isMatch) {
							return done(null, user);
						} else {
							return done(null, false, {
								message: 'password incorrect'
							});
						}
					});
				})
				.catch(err => console.log(err))
		})
	);
}

passport.serializeUser( (user, done) => {
	done(null, user.id);
});

passport.deserializeUser( (id, done) => {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});