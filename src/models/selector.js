import * as THREE from 'three';

export default {
    mesh() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
            color:  new THREE.Color( 0xff0000 ),
            opacity: 0.5,
            transparent: true,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x += 0.5;
        cube.position.y += 0.5;
        cube.position.z += 0.5;
        return cube;
    }
}