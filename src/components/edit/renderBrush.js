import cubeUtil from '@/util/cube.js';
import textureUtil from '@/components/map/texture.js';
import * as THREE from 'three';

export default {
    mesh(brush, translate = false) {
        window.console.log("renderBrush#mesh with translate=" + translate);
        var group = new THREE.Group();
        for (let obj of brush) {
            const texture = textureUtil.getTextureForName(obj.texture);
            const cube = cubeUtil.newCube(obj.x, obj.y, obj.z, obj.w, obj.l, obj.h, texture);
            if (translate) {
                cube.position.x = cube.position.x - 0.5;
                cube.position.y = cube.position.y - 0.5;
            }
            group.add(cube);
        }
        return group;
    }
}