module.exports = {
    async get(req, res) {
        const id = req.params.id;

        try {
            const [cube, accessories] = await Promise.all([
                req.storage.getById(id),
                req.accessory.getAll(),
            ]);

            const existingIds = cube.accessories.map(a => a._id.toString());
            const availableAccessories = accessories.filter(a => existingIds.includes(a.id.toString()) == false);

            res.render('attach', {  cube, accessories: availableAccessories });
        } catch (err) {
            res.redirect('404');
        }
    },
    async post(req, res) {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        try {
            await req.storage.attachAccessory(cubeId, accessoryId);
            res.redirect('/');
        } catch (err) {
            console.log('Error creating accessory');
            console.log(err.message);
            res.redirect('/attach/' + cubeId);
        }
    }
}