module.exports = {
    get(req, res) {
        res.render('createAccessory');
    },
    async post(req, res) {
        const accessory = {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        }

        console.log(accessory);


        try {
            await req.accessory.createAccessory(accessory);
            res.redirect('/');
        } catch (err) {
            console.log('Error creating accessory');
            res.redirect('/accessory');
        }
    }
}