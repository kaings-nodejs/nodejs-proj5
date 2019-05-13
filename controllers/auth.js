exports.getAuth = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login'
    });
};

exports.postAuth = (req, res, next) => {
    res.redirect('/');
};