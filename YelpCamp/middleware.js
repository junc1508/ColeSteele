module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //store the url
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be signed in");
    return res.redirect("/login");
  }
  next();
};

//store returnTo from session (req.sesion.returnTo) to res.locals
module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};
