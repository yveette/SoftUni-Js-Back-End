module.exports = {
    get(req, res) {
        res.render('create');
    },
   async post(req, res) {
        const cube = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficultyLevel: Number(req.body.difficultyLevel),
        }

        await req.storage.createCube(cube);
        res.redirect('/');
    }
}