const { Schema, model, Types: { ObjectId } } = require('mongoose');

const cubeSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxlength: 25 },
    imageUrl: { type: String, required: true },
    difficultyLevel: { type: Number, min: 1, max: 6 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
});

const Cube = model('Cube', cubeSchema);

module.exports = Cube;

