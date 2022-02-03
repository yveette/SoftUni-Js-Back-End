function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        cubes: accessory.cubes,
    }
}

function cubeViewModel(cube) {
    const model = {
        id: cube._id,
        name: cube.name,
        description: cube.description,
        imageUrl: cube.imageUrl,
        difficultyLevel: cube.difficultyLevel,
        accessories: cube.accessories,
    };
    return model;
}


module.exports = {
    accessoryViewModel,
    cubeViewModel
}