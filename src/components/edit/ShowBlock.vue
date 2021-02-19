<template>
    <div :id="id" class="block">
    </div>
</template>

<script>
import * as THREE from 'three';
import Water from '@/models/water.js';
import Grass from '@/models/grass.js';
import Rock from '@/models/rock.js';
import Tree from '@/models/tree.js';

const N = "N", S = "S", E = "E", W = "W", NE = "NE", NW = "NW", SE = "SE", SW = "SW";

const DIAG = 1.06;
const STRAIGHT = 1.5;

const pi = (mult) => Math.PI * mult; 

export default {
    props: {
        id: String,
        brush: String,
        size: String,
        orientation: {
            type: String,
            default: N
        }
    },
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            block: null
            // orientation: SW
        }
    },
    watch: {
        brush() {
            window.console.log("brush changed");
            this.updateBlock();
        },
        orientation() {
            this.rotateCamera();
        }
    },
    mounted() {
        this.scene = new THREE.Scene();
        if (this.size === 's100') {
            this.camera = new THREE.PerspectiveCamera(75, 100 / 100, 0.1, 1000);
        } else if (this.size === 's200') {
            this.camera = new THREE.PerspectiveCamera(75, 200 / 200, 0.1, 1000);
        }
        
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        if (this.size === 's100') {
            this.renderer.setSize(100, 100);
        } else if (this.size === 's200') {
            this.renderer.setSize(200, 200);
        }
            
        this.$nextTick(function () {
            const placeCanvas = document.getElementById(this.id);
            placeCanvas.appendChild(this.renderer.domElement);
        });

        this.updateBlock();

        this.rotateCamera();

        this.animate();
    },
    methods: {
        animate() {
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        },
        updateBlock() {
            window.console.log(`update brush: ${this.brush}`);
            this.scene.remove(this.block);
            if (this.brush === "" || this.brush === "water") {
                this.block = Water.mesh();
            } else if (this.brush === "grass") {
                this.block = Grass.mesh();
            } else if (this.brush === "rock") {
                this.block = Rock.mesh();
            } else if (this.brush === "tree") {
                this.block = Tree.mesh();
            }
            
            this.block.position.x = 0;
            this.block.position.y = 0;
            this.scene.add(this.block);
        },
        rotateCamera() {
            window.console.log(`rotate camera ${this.orientation}`);
            switch(this.orientation) {
                case NE:
                    this.camera.position.set(-DIAG, -DIAG, STRAIGHT);
                    this.camera.rotation.x = pi( 0.25); //p15;
                    this.camera.rotation.y = pi(-0.20); //-p14;
                    this.camera.rotation.z = pi(-0.16); //-p215;
                    break;
                case N:
                    this.camera.position.set(0, -STRAIGHT, STRAIGHT);
                    this.camera.rotation.x = pi( 0.3);
                    this.camera.rotation.y = 0;
                    this.camera.rotation.z = 0;
                    break;
                case NW:
                    this.camera.position.set(DIAG, -DIAG, STRAIGHT);
                    this.camera.rotation.x = pi( 0.25); //p25; //p15;
                    this.camera.rotation.y = pi( 0.20); //p20; //p14;
                    this.camera.rotation.z = pi( 0.16); //p18; //p215;
                    break;
                case E:
                    this.camera.position.set(-STRAIGHT, 0, STRAIGHT);
                    this.camera.rotation.x = 0;
                    this.camera.rotation.y = pi(-0.3);
                    this.camera.rotation.z = pi(-0.5);
                    break;
                case SE:
                    this.camera.position.set(-DIAG, DIAG, STRAIGHT);
                    this.camera.rotation.x = pi(-0.25); //-p15;
                    this.camera.rotation.y = pi(-0.20); //-p14;
                    this.camera.rotation.z = pi(-0.83); //-p78;
                    break;
                case S:
                    this.camera.position.set(0, STRAIGHT, STRAIGHT);
                    this.camera.rotation.x = pi(-0.3);
                    this.camera.rotation.y = 0;
                    this.camera.rotation.z = pi(-1); // * Math.PI;
                    break;
                case SW:
                    this.camera.position.set(DIAG, DIAG, STRAIGHT);
                    this.camera.rotation.x = pi(-0.25);
                    this.camera.rotation.y = pi(0.20);
                    this.camera.rotation.z = pi(0.83);
                    break;
                case W:
                    this.camera.position.set(STRAIGHT, 0, STRAIGHT);
                    this.camera.rotation.x = 0;
                    this.camera.rotation.y = pi(0.3);
                    this.camera.rotation.z = pi(0.5);
                    break;
            }
        }
    }
}
</script>

<style>
div.block canvas {
    border: 1px solid #000;
    border-radius: 4px;
    box-sizing: border-box;
}
</style>