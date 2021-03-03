import * as THREE from 'three';
import playerUtil from './player.js';
import selectorUtil from './selector.js';
import modelUtil from '@/components/terrain/models.js';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        mapname: '',
        starting: {
            x: 1,
            y: 1,
            facing: 'up'
        }
    }
});

let group = new THREE.Group();

let midx = 0;
let midy = 0;

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

const updateBoard = function({x, y, brush, orientation}) {
    if (orientation === 'N') {
        map[x][y] = modelUtil.getIdForName(brush);
    } else {
        map[x][y] = { orientation, id: modelUtil.getIdForName(brush) };
    }

    removeCube({x, y});
    drawCube({x, y});
}

const removeCube = function({x, y}) {
    const cubeToRemove = group.getObjectByName(cubeName(x, y));
    group.remove(cubeToRemove);
}

const drawCube = function({x, y}) {
    let cube = null;
    const key = map[x][y];
    if (typeof key === 'object') {
        cube = modelUtil.mesh(key.id, true);
        switch (key.orientation) {
            case 'S':
                cube.rotation.z = Math.PI;
                break;
            case 'E':
                cube.rotation.z = Math.PI / 2 * -1;
                break;
            case 'W':
                cube.rotation.z = Math.PI / 2;
                break;
            case 'N':
            default:
                cube.rotation.z = 0;
                break;
        }
    } else if (typeof key === 'number') {
        cube = modelUtil.mesh(key, true);
    }
    
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

    map = newMap.map;
    store.state.mapname = newMap.name;
    if (newMap.starting) {
        store.state.starting = newMap.starting;
    }
    
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
    getBoard,
    getName: () => store.state.mapname,
    changeName: (name) => store.state.mapname = name,
    width: () => map.length,
    height: () => map[0].length,
    getAt: (x, y) => map[x][y],
    getStarting: () => store.state.starting,
    setStarting: (starting) => store.state.starting = starting
}