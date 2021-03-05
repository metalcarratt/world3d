const NEGATIVE = -1;

const rotateCamera = function(camera, {x, y, z}) {
    camera.rotation.x=x;
    camera.rotation.y=y;
    camera.rotation.z=z;
}



export default {
    faceNorth(playerCube, camera) {
        playerCube.rotation.z = 0;
        camera.position.set(0,-3,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: Math.PI * 0.2,
            y: 0,
            z: 0
        });
    },
    
    faceWest(playerCube, camera) {
        playerCube.rotation.z = Math.PI / 2;
        camera.position.set(3,0,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: 0,
            y: Math.PI * 0.2,
            z: Math.PI / 2
        });
    },
    
    faceEast(playerCube, camera) {
        playerCube.rotation.z = Math.PI / 2 * NEGATIVE;
        camera.position.set(-3,0,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: 0,
            y: Math.PI * 0.2 * NEGATIVE,
            z: Math.PI / 2 * NEGATIVE
        });
    },
    
    faceSouth(playerCube, camera) {
        playerCube.rotation.z = Math.PI;
        camera.position.set(0,3,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: Math.PI * 0.2 * NEGATIVE,
            y: 0,
            z: Math.PI * NEGATIVE
        });
    },
    
    faceNorthEast(playerCube, camera) {
        playerCube.rotation.z = Math.PI * 0.25 * -1;
        camera.position.set(-2.12,-2.12,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: 0.49, //Math.PI * 0.2,
            y: 0.4 * NEGATIVE, //Math.PI * 0.2 * NEGATIVE,
            z: 0.68 * NEGATIVE //Math.PI * 0.2 * NEGATIVE
        });
    },

    faceNorthWest(playerCube, camera) {
        playerCube.rotation.z = Math.PI * 0.25;
        camera.position.set(2.12,-2.12,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: 0.49, //Math.PI / 4, //0.78, //Math.PI * 0.2,
            y: 0.43, //Math.PI / 5, //0.63, //Math.PI * 0.2,
            z: 0.68, //Math.PI / 5.7 //0.55 //Math.PI * 0.2
        });
    },

    faceSouthEast(playerCube, camera) {
        playerCube.rotation.z = Math.PI * 0.75 * NEGATIVE;
        camera.position.set(-2.12,2.12,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: -0.46, //Math.PI * 0.2 * NEGATIVE,
            y: -0.43, //Math.PI * 0.2 * NEGATIVE,
            z: -2.46 //Math.PI * 1.2
        });
    },

    faceSouthWest(playerCube, camera) {
        playerCube.rotation.z = Math.PI * 0.75;
        camera.position.set(2.12,2.12,playerCube.position.z + 4);
        rotateCamera(camera, {
            x: -0.46, //Math.PI * 0.2 * NEGATIVE,
            y: 0.4, //Math.PI * 0.2,
            z: 2.46 //Math.PI * 1.2 * NEGATIVE
        });
    }
}