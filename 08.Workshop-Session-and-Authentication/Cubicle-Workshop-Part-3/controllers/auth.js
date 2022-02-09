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
    async registerPost(req, res) {
        try {
            await req.auth.register(req.body.username, req.body.password, req.body.repeatPassword)
            res.redirect('/');
        } catch (err) {
            console.log('Error to register');
            res.redirect('/register');
        }
    }
}