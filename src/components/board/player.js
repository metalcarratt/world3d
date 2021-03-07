import RotateCamera from './rotateCamera.js';
import board from './board.js';
// import Ghost from '@/models/ghost.js';
import modelUtil from '@/components/terrain/models.js';

const UP = 'up';

let playerCube = null;
let playerOldFacing = UP;
let myCamera = null;

const playerLocation = {
    x: 1,
    y: 1,
    z: 1,
    facing: 'up'
}

const initPlayer = function(camera) {
    myCamera = camera;
    playerCube = modelUtil.meshModel(modelUtil.getModelForName('Player'), true);
    const starting = board.getStarting();
    playerLocation.x = parseInt(starting.x);
    playerLocation.y = parseInt(starting.y);
    if (starting.facing) {
        playerLocation.facing = starting.facing;
    }
    positionPlayer();
    board.group.add(playerCube);
}

const positionPlayer = function() {
    // window.console.log("positioning player");
    playerCube.position.x = playerLocation.x - board.getMid().midx;
    playerCube.position.y = playerLocation.y - board.getMid().midy;
    playerCube.position.z = playerLocation.z; // + 0.7;
    // window.console.log(`positioning player at ${playerLocation.x}, ${playerLocation.y}`);
    // window.console.log(`midx: ${board.getMid().midx}, midy: ${board.getMid().midy}`);
    // window.console.log(`player facing: ${playerOldFacing}, ${playerLocation.facing}`);

    board.group.position.x = 0 - playerCube.position.x;
    // if (playerLocation.facing === 'right') {
    //     board.group.position.x = board.group.position.x - 1;
    // }
    board.group.position.y = 0 - playerCube.position.y;
    
    RotateCamera.rotate({
        playerLocation,
        playerOldFacing: playerOldFacing,
        playerCube: playerCube,
        camera: myCamera
    })
    
    playerOldFacing = playerLocation.facing;
    
};

const getPlayerLocation = function() {
    return playerLocation;
}

const moveAllowed = function(x, y, z) {
    const clearAhead = board.getAt(x, y, z) === 0;
    const solidBeneath = modelUtil.isPassable(board.getAt(x, y, z - 1));
    window.console.log(`moveAllowed? clearAhead=${clearAhead}, solidBeneath=${solidBeneath}`);
    return clearAhead && solidBeneath;
}

const moveXAllowed = function(x) {
    const allowed = x >= 0 && x < board.width() && moveAllowed(x, playerLocation.y, playerLocation.z);
    window.console.log(`move x allowed: ${allowed} x=${x}`);
    return allowed;
}

const moveYAllowed = function(y) {
    const allowed = y >= 0 && y < board.height() && moveAllowed(playerLocation.x, y, playerLocation.z);
    window.console.log(`move allowed: ${allowed} y=${y}`);
    return allowed;
}

const updatePlayerLocation = function({x, y, facing}) {
    if (facing !== undefined) {
        playerLocation.facing = facing;
    }

    if (x !== undefined && moveXAllowed(x)) {
        playerLocation.x = x;
    }
    if (y !== undefined && moveYAllowed(y)) {
        playerLocation.y = y;
    }    
    
    positionPlayer(this.camera);
}

export default {
    initPlayer,
    positionPlayer,
    getPlayerLocation,
    updatePlayerLocation
}