import RotateCamera from './rotateCamera.js';
import board from './board.js';

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

const initPlayer = function(player, camera) {
    myCamera = camera;
    playerCube = player.mesh();
    positionPlayer();
    board.group.add(playerCube);
}

const positionPlayer = function() {
    playerCube.position.x = playerLocation.x - board.getMid().midx;
    playerCube.position.y = playerLocation.y - board.getMid().midy;
    playerCube.position.z = playerLocation.z + 0.7;
    // window.console.log(`positioning player at ${playerLocation.x}, ${playerLocation.y}`);
    // window.console.log(`midx: ${board.midx}, midy: ${board.midy}`);
    // window.console.log(`player facing: ${playerOldFacing}, ${playerLocation.facing}`);

    board.group.position.x = 0 - playerCube.position.x;
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
    if (x) {
        playerLocation.x = x;
    }
    if (y) {
        playerLocation.y = y;
    }
    if (facing) {
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