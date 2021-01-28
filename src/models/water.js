import cubeUtil from '@/util/cube.js';
import waterTexture from '@/assets/water.texture'

export default {
    mesh() {
        return cubeUtil.newCube(0, 0, 0, 1, 1, 0.1, waterTexture);
    }
}