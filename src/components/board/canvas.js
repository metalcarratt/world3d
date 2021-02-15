import * as THREE from 'three';
import board from './board.js';

let renderer = null;
let scene = null;
let camera = null;

function addLight(scene) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 8);
    scene.add(light);
}

const animate = function() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

const windowResize = function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export default {
    animate: () => animate(),
    initRenderer() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        addLight(scene);
    },
    nextTick() {
        const placeCanvas = document.getElementById("gameBoard");
        placeCanvas.appendChild(renderer.domElement);
        window.addEventListener('resize', windowResize);
    },
    reset() {
        const placeCanvas = document.getElementById("gameBoard");
        placeCanvas.removeChild(placeCanvas.lastChild);
        placeCanvas.appendChild(renderer.domElement);
        window.addEventListener('resize', windowResize);
    },
    initBoard() {
        board.init(scene, camera);
    },
    getCamera: () => camera
}