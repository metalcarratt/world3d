import * as THREE from 'three';
import cubeUtil from '@/util/cube.js';
import hairTexture from '@/assets/hair.texture';
import whiteClothTexture from '@/assets/whiteCloth.texture'
import skinTexture from '@/assets/skin.texture'

export default {
    mesh() {
        var group = new THREE.Group();
        group.add(cubeUtil.newCube(0, -0.1, 0, 0.4, 0.35, 0.4, hairTexture));
        group.add(cubeUtil.newCube(0, 0, 0, 0.3, 0.3, 0.3, skinTexture));
        group.add(cubeUtil.newCube(0, 0, -0.4, 0.3, 0.2, 0.5, whiteClothTexture));
        return group;
    }
}