import cubeUtil from '@/util/cube.js';
import textureUtil from '@/components/map/texture.js';
import * as THREE from 'three';

export default {
    mesh(brush) {
        var group = new THREE.Group();
        for (let obj of brush) {
            const texture = textureUtil.getTextureForName(obj.texture);
            const cube = cubeUtil.newCube(obj.x, obj.y, obj.z, obj.w, obj.l, obj.h, texture);
            // cube.translate(0.01, 0.01, 0.01);
            // cube.center();
            cube.position.x = cube.position.x - 0.5;
            cube.position.y = cube.position.y - 0.5;
            group.add(cube);
        }
        
        // group.geometry.translate(0.5, 0.5, 0.5);
        return group;
        // window.console.log("render brush");
        // window.console.log(brush);
        // return cubeUtil.newCube(brush.x, brush.y, brush.z, brush.w, brush.l, brush.h, textureUtil.getTextureForName(brush.texture));
    }
}