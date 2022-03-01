const { getJobById } = require('../services/jobs');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;
        const data = await getJobById(id);
        res.locals.data = data;
        next();
    };
}

module.exports = preload;