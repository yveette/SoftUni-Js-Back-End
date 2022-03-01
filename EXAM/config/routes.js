const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const jobsController = require('../controllers/jobs');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(jobsController);

    app.get('*', (req, res) => {
        res.status(404).render('404', { title: 'Not Found Page' });
    });
};