import * as THREE from 'three';
// import buildSelector from '@/models/selector.js';
import playerUtil from './player.js';
import selectorUtil from './selector.js';

const group = new THREE.Group();

let midx = 0;
let midy = 0;
// let selector = null;

const map = [
    [0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0],
    [0,1,2,3,2,1,0],
    [0,1,1,2,1,0,0],
    [0,0,0,1,1,2,0],
    [0,0,1,1,2,0,0],
    [0,3,1,1,0,0,0],
    [0,0,0,0,0,0,0],
];

// const positionSelector = function(selectorLocation) {
//     selector.position.x = selectorLocation.x - midx;
//     selector.position.y = selectorLocation.y - midy;
//     selector.position.z = selectorLocation.z;
//     selector.visible = selectorLocation.show;
// }

const updateBoard = function({x, y, brush, palette}) {
    // window.console.log("updateBoard, x=" + x + ", y=" + y + ", brush=" + brush);
    switch (brush) {
      case "water":
        map[x][y] = 0;
        break;
      case "grass":
        map[x][y] = 1;
        break;
      case "rock":
        map[x][y] = 2;
        break;
      case "tree":
        map[x][y] = 3;
        break;
    }

    removeCube({x, y});
    drawCube({palette, x, y});
}

const removeCube = function({x, y}) {
    const cubeToRemove = group.getObjectByName(cubeName(x, y));
    group.remove(cubeToRemove);
}

const drawCube = function({palette, x, y}) {
    let cube = null;
    const key = map[x][y];
    cube = palette[key].mesh();
    cube.name = cubeName(x, y);
            
    cube.position.x = x - midx;
    cube.position.y = y - midy;
    group.add(cube);
}

const cubeName = (x, y) => "{x=" + x + "y=" + y + "}";

const draw = function(palette) {
    // window.console.log("draw");
    const width = map.length;
    const height = map[0].length;
    for (var x = 0; x < width; x++) {
        
        for (var y = 0; y < height; y++) {
            // window.console.log(`${x}, ${y} : ${map[x][y]}`);
            drawCube({palette, x, y});
        }
    }
}

const init = function(player, scene, camera, palette) {
    const width = map.length;
    const height = map[0].length;
    midx = Math.floor(width/2);
    midy = Math.floor(height/2);
    // window.console.log(`init midx: ${midx}, midy: ${midy}`);

    draw(palette);

    playerUtil.initPlayer(player, camera);

    // selector = buildSelector.mesh();
    // positionSelector(selectorLocation);
    // group.add(selector);
    selectorUtil.initSelector();

    scene.add(group);
}

const getMid = function() {
    return {midx, midy};
}

export default {
    updateBoard,
    init,
    draw,
    getMid, group
}