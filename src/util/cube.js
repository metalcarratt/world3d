import * as THREE from 'three';

export default {
    newCube(x, y, z, width, length, height, textureImage) {
        const geometry = new THREE.BoxGeometry(width, length, height);
            
        const texture = new THREE.TextureLoader().load(textureImage);
        const material = new THREE.MeshBasicMaterial({map: texture});
    
        const cube = new THREE.Mesh(geometry, material);

        if (x !== 0) {
            cube.position.x += x;
        }

        if (y !== 0) {
            cube.position.y += y;
        }

        if (z !== 0) {
            cube.position.z += z;
        }
    
        return cube;
    }
}