import RotateCamera from './rotateCamera.js';
import board from './board.js';
// import Ghost from '@/models/ghost.js';
import modelUtil from '@/components/models.js';

const UP = 'up';

let playerCube = null;
let playerOldFacing = UP;
let myCamera = null;

const playerLocation = {
    x: 1,
    y: 1,
    z: 0,
    facing: 'up'
}

const initPlayer = function(camera) {
    myCamera = camera;
    playerCube = modelUtil.meshModel(modelUtil.getModelForName('Player'), true);
    // playerCube = Ghost.mesh();
    positionPlayer();
    board.group.add(playerCube);
}

const positionPlayer = function() {
    window.console.log("positioning player");
    playerCube.position.x = playerLocation.x - board.getMid().midx;
    playerCube.position.y = playerLocation.y - board.getMid().midy;
    playerCube.position.z = playerLocation.z; // + 0.7;
    window.console.log(`positioning player at ${playerLocation.x}, ${playerLocation.y}`);
    window.console.log(`midx: ${board.getMid().midx}, midy: ${board.getMid().midy}`);
    window.console.log(`player facing: ${playerOldFacing}, ${playerLocation.facing}`);

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

const updatePlayerLocation = function({x, y, facing}) {
    if (x !== undefined) {
        playerLocation.x = x;
    }
    if (y !== undefined) {
        playerLocation.y = y;
    }
    if (facing !== undefined) {
        playerLocation.facing = facing;
    }
    positionPlayer(this.camera);
}

export default {
    initPlayer,
    positionPlayer,
    getPlayerLocation,
    updatePlayerLocation
}