module.exports = {
    async home(req, res) {
        const cubes = await req.storage.getAll(req.query);
        res.render('index', { cubes, query: req.query })
    }
}