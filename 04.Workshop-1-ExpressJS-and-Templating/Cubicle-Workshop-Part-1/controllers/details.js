module.exports = {
    async details(req,res) {
        const id = req.params.id;
        const cube = await req.storage.getById(id);
        console.log(cube)

        if (cube) {
            res.render('details', cube);
        } else {
            res.redirect('/404');
        }
    }
}