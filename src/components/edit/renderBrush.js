import cubeUtil from '@/util/cube.js';
import waterTexture from '@/assets/water.texture'

export default {
    mesh(brush) {
        window.console.log("render brush");
        window.console.log(brush);
        return cubeUtil.newCube(brush.x, brush.y, brush.z, brush.w, brush.l, brush.h, waterTexture);
    }
}