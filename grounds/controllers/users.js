const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
}

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, err => {
      if (err) {
        return next(err);
      } else {
        req.flash('success', 'Welcome to Grounds!');
        res.redirect('/campgrounds');
      }
    })
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
}

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
}

module.exports.login = (req, res) => {
  req.flash('success', `Welcome back ${req.body.username}!`);
  const redirectUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out!');
  res.redirect('/campgrounds');
}