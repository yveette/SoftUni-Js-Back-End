const { Schema, model, Types: { ObjectId } } = require('mongoose');

const adSchema = new Schema({
    headline: { type: String, required: [true, 'Headline is required!'], minlength: [4, 'Headline should be a minimum of 4 characters long'] },
    location: { type: String, required: [true, 'Location is required!'], minlength: [8, 'Location should be a minimum of 8 characters long'] },
    name: { type: String, required: [true, 'Company name is required!'], minlength: [3, 'Company name should be at least 3 characters long'] },
    description: { type: String, required: [true, 'Description is required!'], maxlength: [40, 'The description of skills should be a maximum of 40 characters long'] },
    author: { type: ObjectId, ref: 'User', required: true },
    applied: { type: [ObjectId], ref: 'User', default: [] },
},
    { timestamps: true });

const Ad = model('Ad', adSchema);

module.exports = Ad;