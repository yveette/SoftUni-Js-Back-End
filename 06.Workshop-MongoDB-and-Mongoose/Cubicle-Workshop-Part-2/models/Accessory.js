const { Schema, model, Types: { ObjectId } } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, required: true },
});

// cubes: { type: [ObjectId], default: [], ref: 'Cubes' },
const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;