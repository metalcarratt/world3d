import * as THREE from 'three';
import cubeUtil from '@/util/cube.js';
import grassTexture from '@/assets/grass.texture'
import barkTexture from '@/assets/bark.texture'
import leavesTexture from '@/assets/leaves.texture'

export default {
    mesh() {
        var group = new THREE.Group();
        group.add(cubeUtil.newCube(0, 0, 0, 1, 1, 0.3, grassTexture));
        group.add(cubeUtil.newCube(0, 0, 0.3, 0.5, 0.5, 1.5, barkTexture));
        group.add(cubeUtil.newCube(0, 0, 1, 1, 1, 0.6, leavesTexture));
        return group;
    }
}