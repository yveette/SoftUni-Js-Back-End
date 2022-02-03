const fs = require('fs/promises');
const Cube = require('../models/Cube');
const { cubeViewModel } = require('./util');
const filePath = './config/database.json';

async function getAll(query) {
    
    const options = {};
    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.difficultyLevel = { $gte: Number(query.from) };
    }
    if (query.to) {
        if (!options.difficultyLevel) {
            options.difficultyLevel = {};
        }
        options.difficultyLevel.$lte = Number(query.to);
    }
    
    const cubes = await Cube.find(options);
    return cubes.map(cubeViewModel);
}

async function getById(id) {
    const cube = await Cube.findById(id);

    if (cube) {
        return cubeViewModel(cube);
    } else {
        return undefined;
    }
}

async function createCube(cube) {
    const result = new Cube(cube);
    await result.save();
}

async function attachAccessory(cubeId, accessoryId) {
    const existing = await Cube.findById(cubeId);
    existing.accessories.push(accessoryId);

    await existing.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCube,
        attachAccessory
    };
    next();
}