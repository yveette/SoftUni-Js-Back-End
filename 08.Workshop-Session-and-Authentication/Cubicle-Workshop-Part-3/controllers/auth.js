module.exports = {
    get(req, res) {
        res.render('auth/login');
    },
    post(req, res) {
        res.redirect('/');
    }
}