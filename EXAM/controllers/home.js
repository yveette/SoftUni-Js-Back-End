const { isUser } = require('../middleware/guards');
const preload = require('../middleware/preload');
const { getFirstThree, getAll, applyToJob, getByEmail } = require('../services/jobs');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const jobs = await getFirstThree();
    // add applied count
    jobs.forEach(j => j.count = j.applied.length);
    res.render('home', { title: 'Home Page', jobs });
});

router.get('/catalog', async (req, res) => {
    const jobs = await getAll();
    res.render('catalog', { title: 'All-Ads Page', jobs });
});

router.get('/catalog/:id', preload(), (req, res) => {
    const job = res.locals.data;

    if (req.session.user) {
        job.hasUser = true;
        job.isOwner = req.session.user?._id == job.author._id;

        if (job.applied.some(u => u._id == req.session.user._id)) {
            job.isApplied = true;
        }
    }

    res.render('details', { title: 'Details Page', data: job });
});

router.get('/apply/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    try {
        await applyToJob(id, req.session.user._id);
    } catch (err) {
        console.error(err);
    } finally {
        res.redirect('/catalog/' + id);
    }

});

router.get('/search', isUser(), (req, res) => {
    res.render('search', { title: 'Search' });
});

router.post('/search', isUser(), async (req, res) => {
    const search = req.body.search;

    // search by valid email
    const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
    let errors;
    try {
        if (EMAIL_PATTERN.test(search) == false) {
            throw new Error('Search by valid email!');
        }

        let results = await getByEmail(search);
        if (results != undefined) {
            res.locals.results = results;
        } else {
            res.locals.results = [];
        }

        res.locals.search = search;
    } catch (err) {
        console.error(err);
        errors = mapErrors(err);
    } finally {
        res.render('search', { title: 'Search Page', errors });
    }

});

module.exports = router;