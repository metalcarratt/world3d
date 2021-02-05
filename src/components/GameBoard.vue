<template>
    <div id="gameBoard">
        Camera: x={{camera.position.x}} y={{camera.position.y}} z={{camera.position.z}} + rotation: x={{ camera.rotation.x }} y={{ camera.rotation.y}} z={{ camera.rotation.z }}
        Scene rotation: x={{ group.rotation.x }} y={{ group.rotation.y }} z={{ group.rotation.z }}
        
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
    </div>
</template>

<script>
import * as THREE from 'three';
import RotateCamera from './rotateCamera.js';
import buildSelector from '@/models/selector.js';

const UP = 'up';

const rotations = [
    0,
    0.25 * Math.PI,
    0.5 * Math.PI,
    0.75 * Math.PI,
    Math.PI,
    1.25 * Math.PI,
    1.5 * Math.PI,
    1.75 * Math.PI
]

function addLight(scene) {
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 8);
  scene.add(light);
}

export default {
    props: ['board', 'palette', 'player', 'playerLocation', 'selectorLocation'],
    data() {
        return {
            renderer: null,
            scene: null,
            camera: null,
            group: null,
            projector: null,
            mouseVector: null,
            rotationIndex: 0,
            playerCube: null,
            midx: 0,
            midy: 0,
            Y_AXIS: null,
            camera_pivot: null,
            playerOldFacing: UP,
            cface: 'N',
            selector: null
        }
    },
    mounted() {
        this.initRenderer();
        this.initBoard();
        this.animate();
    },
    watch: {
        playerLocation: {
            handler: function() {
                this.positionPlayer();
            },
            deep: true
        },
        selectorLocation: {
            handler: function() {
                this.positionSelector();
            },
            deep: true
        },
        cface() {
            RotateCamera.runInOrder([this.cface], this.playerCube, this.camera);            
        }
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

            this.camera_pivot = new THREE.Object3D()
            this.Y_AXIS = new THREE.Vector3( 0, 1, 1 );
            this.scene.add( this.camera_pivot );
            this.camera_pivot.add( this.camera );
            addLight(this.scene);
        },
        initBoard() {
            this.group = new THREE.Group();
            const width = this.board.length;
            const height = this.board[0].length;
            this.midx = Math.floor(width/2);
            this.midy = Math.floor(height/2);
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    let cube = null;
                    const key = this.board[x][y];
                    cube = this.palette[key].mesh();
                    
                    cube.position.x = x - this.midx;
                    cube.position.y = y - this.midy;
                    this.group.add(cube);
                    
                }
            }

            this.playerCube = this.player.mesh();
            this.positionPlayer();
            this.group.add(this.playerCube);

            this.selector = buildSelector.mesh();
            this.positionSelector();
            this.group.add(this.selector);


            this.scene.add(this.group);
            this.group.rotation.z = rotations[this.rotationIndex];
        },
        windowResize() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        positionPlayer() {
            window.console.log("position player");
            this.playerCube.position.x = this.playerLocation.x - this.midx;
            this.playerCube.position.y = this.playerLocation.y - this.midy;
            this.playerCube.position.z = this.playerLocation.z + 0.7;

            this.group.position.x = 0 - this.playerCube.position.x;
            this.group.position.y = 0 - this.playerCube.position.y;
            
            RotateCamera.rotate({
                playerLocation: this.playerLocation,
                playerOldFacing: this.playerOldFacing,
                playerCube: this.playerCube,
                camera: this.camera
            })
            
            this.animate();
            this.playerOldFacing = this.playerLocation.facing;
            
        },
        positionSelector() {
            this.selector.position.x = this.selectorLocation.x - this.midx;
            this.selector.position.y = this.selectorLocation.y - this.midy;
            this.selector.position.z = this.selectorLocation.z;
            this.animate();
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