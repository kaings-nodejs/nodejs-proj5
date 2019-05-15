exports.getAuth = (req, res, next) => {
    console.log('getAuth_cookie..... ', req.get('Cookie')); // get cookie
    const loggedIn = req.get('Cookie');

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: loggedIn
    });
};

exports.postAuth = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');   // set cookie
    res.redirect('/');
};