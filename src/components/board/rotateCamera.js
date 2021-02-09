import FaceCamera from './faceCamera.js';

const N = "N", S = "S", E = "E", W = "W", NE = "NE", NW = "NW", SE = "SE", SW = "SW";

const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default {
    rotate({playerLocation, playerOldFacing, playerCube, camera}) {
        if (playerLocation.facing !== playerOldFacing) {
            if (playerOldFacing === UP && playerLocation.facing === LEFT) {
                this.runInOrder([NW, W], playerCube, camera);

            } else if (playerOldFacing === UP && playerLocation.facing === RIGHT) {
                this.runInOrder([NE, E], playerCube, camera);

            } else if (playerOldFacing === DOWN && playerLocation.facing === LEFT) {
                this.runInOrder([SW, W], playerCube, camera);

            } else if (playerOldFacing === DOWN && playerLocation.facing === RIGHT) {
                this.runInOrder([SE, E], playerCube, camera);
                
            } else if (playerOldFacing === LEFT && playerLocation.facing === UP) {
                this.runInOrder([NW, N], playerCube, camera);
                
            } else if (playerOldFacing === LEFT && playerLocation.facing === DOWN) {
                this.runInOrder([SW, S], playerCube, camera);

            } else if (playerOldFacing === RIGHT && playerLocation.facing === UP) {
                this.runInOrder([NE, N], playerCube, camera);

            } else if (playerOldFacing === RIGHT && playerLocation.facing === DOWN) {
                this.runInOrder([SE, S], playerCube, camera);
            }
        } else {
            switch (playerLocation.facing) {
                case UP:
                    this.runInOrder([N], playerCube, camera);
                    break;
                case LEFT:
                    this.runInOrder([W], playerCube, camera);
                    break;
                case RIGHT:
                    this.runInOrder([E], playerCube, camera);
                    break;
                case DOWN:
                    this.runInOrder([S], playerCube, camera);
                    break;
            }
        }
    },
    runInOrder(facings, playerCube, camera) {
        setTimeout(() => {
            const facing = facings.shift();
            switch (facing) {
                case N:
                    // window.console.log("Facing N");
                    FaceCamera.faceNorth(playerCube, camera);
                    break;
                case S:
                    // window.console.log("Facing S");
                    FaceCamera.faceSouth(playerCube, camera);
                    break;
                case E:
                    // window.console.log("Facing E");
                    FaceCamera.faceEast(playerCube, camera);
                    break;
                case W:
                    // window.console.log("Facing W");
                    FaceCamera.faceWest(playerCube, camera);
                    break;
                case NE:
                    // window.console.log("Facing NE");
                    FaceCamera.faceNorthEast(playerCube, camera);
                    break;
                case NW:
                    // window.console.log("Facing NW");
                    FaceCamera.faceNorthWest(playerCube, camera);
                    break;
                case SE:
                    // window.console.log("Facing SE");
                    FaceCamera.faceSouthEast(playerCube, camera);
                    break;
                case SW:
                    // window.console.log("Facing SW");
                    FaceCamera.faceSouthWest(playerCube, camera);
                    break;
                default:
                    // window.console.log("Facing O");
            }
            if (facings.length > 0) {
                this.runInOrder(facings, playerCube, camera);
            }
        }, 50);
    }
}