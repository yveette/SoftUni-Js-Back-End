module.exports = {
    loginGet(req, res) {
        res.render('auth/login');
    },
    loginPost(req, res) {
        res.redirect('/');
    },
    registerGet(req, res) {
        res.render('auth/register');
    },
    registerPost(req, res) {
        res.redirect('/');
    }
}