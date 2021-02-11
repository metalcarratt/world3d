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

export default {
    props: ['id', 'brush'],
    data() {
        return {
            scene: null,
            camera: null,
            renderer: null,
            block: null
        }
    },
    watch: {
        brush() {
            window.console.log("brush changed");
            this.updateBlock();
        }
    },
    mounted() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 100 / 100, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        this.renderer.setSize(100, 100);
            
        this.$nextTick(function () {
            const placeCanvas = document.getElementById(this.id);
            placeCanvas.appendChild(this.renderer.domElement);
        });

        this.updateBlock();

        this.camera.position.set(0.8, -0.8, 1.8);
        this.camera.rotation.x = 0.49;
        this.camera.rotation.y = 0.44;
        this.camera.rotation.z = 0.68;

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