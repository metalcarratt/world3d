<template>
    <div id="gameBoard">
        <!--
        X<input type="text" v-model="camera.rotation.x"/>
        Y<input type="text" v-model="camera.rotation.y"/>
        Z<input type="text" v-model="camera.rotation.z"/>

        Facing=<select v-model="cface">
                <option>N</option>
                <option>S</option>
                <option>E</option>
                <option>W</option>
                <option>NE</option>
                <option>NW</option>
                <option>SE</option>
                <option>SW</option>
               </select>
               -->
    </div>
</template>

<script>
import * as THREE from 'three';
import board from './board.js';
import playerUtil from './player.js';

function addLight(scene) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 8);
  scene.add(light);
}

export default {
    props: ['palette', 'player'],
    data() {
        return {
            renderer: null,
            scene: null,
            camera: null,
            projector: null,
            mouseVector: null,
            rotationIndex: 0,
            playerCube: null,
            midx: 0,
            midy: 0,
            allCubes: []
        }
    },
    mounted() {
        this.initRenderer();
        this.initBoard();
        this.animate();
    },
    watch: {
        board: {
            handler: function() {
                window.console.log("board changed");
                this.drawBoard();
            },
            deep: true
        },
        playerLocation: {
            handler: function() {
                playerUtil.positionPlayer(this.camera);
            },
            deep: true
        },
        selectorLocation: {
            handler: function() {
                board.positionSelector(this.selectorLocation);
            },
            deep: true
        },
        // cface() {
        //     RotateCamera.runInOrder([this.cface], this.playerCube, this.camera);            
        // }
    },
    methods: {
        animate() {
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        },
        initRenderer() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            
            this.mouseVector = new THREE.Vector3();
            this.$nextTick(function () {
                const placeCanvas = document.getElementById("gameBoard");
                placeCanvas.appendChild(this.renderer.domElement);
                window.addEventListener('resize', this.windowResize);
            });

            addLight(this.scene);
        },
        initBoard() {
            board.init(this.player, this.scene, this.camera, this.palette);
        },
        drawBoard() {
            board.draw(this.palette);
            
            this.animate();
        },
        windowResize() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}
</script>

<style>
canvas {
	width: 100%;
	height: 100%;
    background-color: green;
}
</style>