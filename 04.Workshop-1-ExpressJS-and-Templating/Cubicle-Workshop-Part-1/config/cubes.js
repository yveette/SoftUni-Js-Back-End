const fs = require('fs/promises');
const filePath = './config/database.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch {
        console.error('Database read error!');
        console.error(err);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch {
        console.error('Database write error!');
        console.error(err);
        process.exit(1);
    }
}

async function getAll(query) {
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

    return cubes;
}

async function getById(id) {
    const data = await read();
    const cube = data[id];

    if (cube) {
        return Object.assign({}, { id }, cube);
    } else {
        return undefined;
    }
}

async function createCube(cube) {
    const cubes = await read();
    let id;
    do {
        id = nextId();
    } while (cubes.hasOwnProperty(id));

    cubes[id] = cube;
    await write(cubes);
}

function nextId() {
    return 'xxxxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}


module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCube
    };
    next();
}