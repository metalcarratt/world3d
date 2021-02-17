import * as THREE from 'three';
import playerUtil from './player.js';
import selectorUtil from './selector.js';
import Water from '@/models/water.js';
import Grass from '@/models/grass.js';
import Rock from '@/models/rock.js';
import Tree from '@/models/tree.js';

let group = new THREE.Group();

let midx = 0;
let midy = 0;

const palette = {
    0: Water,
    1: Grass,
    2: Rock,
    3: Tree
}

let map = [
    [0,0,0,0,0,0,0],
    [0,1,1,1,1,1,0],
    [0,1,2,3,2,1,0],
    [0,1,1,2,1,0,0],
    [0,0,0,1,1,2,0],
    [0,0,1,1,2,0,0],
    [0,3,1,1,0,0,0],
    [0,0,0,0,0,0,0],
];

const getBoard = function() {
    return map;
}

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

const drawCube = function({x, y}) {
    let cube = null;
    const key = map[x][y];
    cube = palette[key].mesh();
    cube.name = cubeName(x, y);
            
    cube.position.x = x - midx;
    cube.position.y = y - midy;
    group.add(cube);
}

const cubeName = (x, y) => "{x=" + x + "y=" + y + "}";

const newBoard = function(newMap) {
    let list = [...group.children];
    for (let child of list) {
        group.remove(child);
    }

    map = newMap;
    draw();

    playerUtil.initPlayer(myCamera);
    selectorUtil.initSelector();
}

const draw = function() {
    window.console.log("draw");
    const width = map.length;
    const height = map[0].length;
    for (var x = 0; x < width; x++) {
        
        for (var y = 0; y < height; y++) {
            drawCube({x, y});
        }
    }
}

let myCamera = null;

const init = function(scene, camera) {
    myCamera = camera;
    const width = map.length;
    const height = map[0].length;
    midx = Math.floor(width/2);
    midy = Math.floor(height/2);
    // window.console.log(`init midx: ${midx}, midy: ${midy}`);

    draw();

    playerUtil.initPlayer(camera);

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
    getMid, group,
    newBoard,
    getBoard
}