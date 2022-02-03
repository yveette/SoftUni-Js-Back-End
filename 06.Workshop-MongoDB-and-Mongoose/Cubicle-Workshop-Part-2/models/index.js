const mongoose = require('mongoose');

const Cube = require('./Cube');
const Accessory = require('./Accessory');
// require('./Accessory');

const connectionString = 'mongodb://localhost:27017/cubicle';

async function init() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected!');

        // await Accessory.create({
        //     "name" : "Sticker Bomb",
        //     "description": "An unique sticker.",
        //     "imageUrl": "https://i.imgur.com/v4PA67e.jpeg"
        // })

        // await Cube.create({
        //     "name": "Gan356 Air SM",
        //     "description": "A cube",
        //     "imageUrl": "https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg",
        //     "difficultyLevel": 3
        // });

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        })
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}

module.exports = init;