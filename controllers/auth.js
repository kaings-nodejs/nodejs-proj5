exports.getAuth = (req, res, next) => {
    console.log('getAuth_session..... ', req.session); // get session
    const loggedIn = req.session.isLoggedIn;

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: loggedIn
    });
};

exports.postAuth = (req, res, next) => {
    req.session.isLoggedIn = true;     // set a property in session
    res.redirect('/');
};