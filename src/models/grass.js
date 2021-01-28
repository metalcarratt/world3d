import cubeUtil from '@/util/cube.js';
import grassTexture from '@/assets/grass.texture'

export default {
    mesh() {
        return cubeUtil.newCube(0, 0, 0, 1, 1, 0.3, grassTexture);
    }
}