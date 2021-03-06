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
    [
        [1,1,1,1,1,1,1],
        [1,2,2,2,2,2,1],
        [1,2,2,2,2,2,1],
        [1,2,2,2,2,1,1],
        [1,1,2,2,2,2,1],
        [1,1,2,2,2,1,1],
        [1,2,2,2,1,1,1],
        [1,1,1,1,1,1,1]
    ],
    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,3,4,3,0,0],
        [0,0,0,3,0,0,0],
        [0,0,0,0,0,3,0],
        [0,0,0,0,3,0,0],
        [0,4,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ],
    [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,10,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,10,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ]
];

const getBoard = function() {
    return map;
}

const updateBoard = function({x, y, z, brush, orientation}) {
    window.console.log("updateBoard");
    if (map[z] === undefined) {
        window.console.log("map[z] undefined");
        addZLayer(z);
    }
    window.console.log(map[z]);

    let modelId = modelUtil.getIdForName(brush);
    if (orientation === 'N') {        
        map[z][x][y] = modelId;
    } else {
        map[z][x][y] = { orientation, id: modelId };
    }

    removeCube({x, y, z});
    drawCube({x, y, z});
}

const addZLayer = function(z) {
    window.console.log("addZLayer");
    map[z] = [];
    for (let x = 0; x < width(); x++) {
        map[z][x] = [];
        for (let y = 0; y < height(); y++) {
            map[z][x][y] = 0;
        }
    }
}

const removeCube = function({x, y, z}) {
    const cubeToRemove = group.getObjectByName(cubeName(x, y, z));
    group.remove(cubeToRemove);
}

const drawCube = function({x, y, z}) {
    let cube = null;
    const key = map[z][x][y];
    if (typeof key === 'object' && key.id !== 0) {
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
    } else if (key !== 0) {
        cube = modelUtil.mesh(key, true);
    }
    
    if (cube !== null) {
        cube.name = cubeName(x, y, z);
                
        cube.position.x = x - midx;
        cube.position.y = y - midy;
        cube.position.z = z;
        group.add(cube);
    }
}

const cubeName = (x, y, z) => `{x=${x},y=${y},z=${z}`;

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
    
    const height = map.length;
    const width = map[0].length;
    const length = map[0][0].length;
    
    for (var z = 0; z < height; z++) {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < length; y++) {
                drawCube({x, y, z});
            }
        }
    }
}

let myCamera = null;

const init = function(scene, camera) {
    myCamera = camera;
    const width = map[0].length;
    const length = map[0][0].length;
    midx = Math.floor(width/2);
    midy = Math.floor(length/2);
    // window.console.log(`init midx: ${midx}, midy: ${midy}`);

    draw();

    playerUtil.initPlayer(camera);

    selectorUtil.initSelector();

    scene.add(group);
}

const getMid = function() {
    return {midx, midy};
}

const width = () => map[0].length;
const height = () => map[0][0].length;

export default {
    updateBoard,
    init,
    draw,
    getMid, group,
    newBoard,
    getBoard,
    getName: () => store.state.mapname,
    changeName: (name) => store.state.mapname = name,
    width,
    height,
    getAt: (x, y, z) => map[z][x][y],
    getStarting: () => store.state.starting,
    setStarting: (starting) => store.state.starting = starting
}