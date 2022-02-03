const fs = require('fs/promises');
const Cube = require('../models/Cube');
const { cubeViewModel } = require('./util');
const filePath = './config/database.json';

async function getAll(query) {
    const cubes = await Cube.find({});

    /*
    const data = await read();
    let cubes = Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        cubes = cubes.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }
    if (query.from) {
        cubes = cubes.filter(c => c.difficultyLevel >= Number(query.from))
    }
    if (query.to) {
        cubes = cubes.filter(c => c.difficultyLevel <= Number(query.to))
    }
    */

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

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCube
    };
    next();
}