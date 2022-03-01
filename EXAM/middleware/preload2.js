const { getJobById2 } = require('../services/jobs');

function preload2() {
    return async function (req, res, next) {
        const id = req.params.id;
        const data = await getJobById2(id);
        res.locals.data = data;
        next();
    };
}

module.exports = preload2;