const router = require('express').Router();

const { isUser, isOwner } = require('../middleware/guards');
const preload2 = require('../middleware/preload2');
const { createJob, updateJob, deleteById } = require('../services/jobs');
const mapErrors = require('../util/mappers');

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' , data: {}});
});

router.post('/create', isUser(), async (req, res) => {
    const job = {
        headline: req.body.headline,
        location: req.body.location,
        name: req.body.name,
        description: req.body.description,
        author: req.session.user._id
    };

    try {
        await createJob(job);
        res.redirect('/catalog');
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create Page', data: job, errors });
    }
});

router.get('/edit/:id', preload2(), isOwner(), (req, res) => {
    res.render('edit', { title: 'Edit Page' });
});

router.post('/edit/:id', preload2(), isOwner(), async (req, res) => {
    const id = req.params.id;

    const job = {
        headline: req.body.headline,
        location: req.body.location,
        name: req.body.name,
        description: req.body.description,
    };

    try {
        await updateJob(id, job);
        res.redirect('/catalog/' + id);
    } catch (err) {
        console.error(err);
        const errors = mapErrors(err);
        job._id = id;
        res.render('edit', { title: 'Edit Page', job, errors });
    }
});

router.get('/delete/:id', preload2(), isOwner(), async (req, res) => {
    await deleteById(req.params.id, req.session.user._id);
    res.redirect('/catalog');
});

module.exports = router;