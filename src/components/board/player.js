import RotateCamera from './rotateCamera.js';
import board from './board.js';

const UP = 'up';

let playerCube = null;
let playerOldFacing = UP;

const initPlayer = function(player, playerLocation, camera) {
    playerCube = player.mesh();
    positionPlayer(playerLocation, camera);
    board.group.add(playerCube);
}

const positionPlayer = function(playerLocation, camera) {
    playerCube.position.x = playerLocation.x - board.getMid().midx;
    playerCube.position.y = playerLocation.y - board.getMid().midy;
    playerCube.position.z = playerLocation.z + 0.7;
    // window.console.log(`positioning player at ${playerLocation.x}, ${playerLocation.y}`);
    // window.console.log(`midx: ${board.midx}, midy: ${board.midy}`);
    // window.console.log(`player facing: ${playerOldFacing}, ${playerLocation.facing}`);

    board.group.position.x = 0 - playerCube.position.x;
    board.group.position.y = 0 - playerCube.position.y;
    
    RotateCamera.rotate({
        playerLocation: playerLocation,
        playerOldFacing: playerOldFacing,
        playerCube: playerCube,
        camera: camera
    })
    
    playerOldFacing = playerLocation.facing;
    
};

export default {
    initPlayer,
    positionPlayer
}