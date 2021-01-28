import cubeUtil from '@/util/cube.js';
import rockTexture from '@/assets/rock.texture'

export default {
    mesh() {
        return cubeUtil.newCube(0, 0, 0, 1, 1, 1, rockTexture);
    }
}