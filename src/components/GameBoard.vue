<template>
    <div id="gameBoard">
        Camera: x={{camera.position.x}} y={{camera.position.y}} z={{camera.position.z}} Scene rotation: x={{ group.rotation.x }} y={{ group.rotation.y }} z={{ group.rotation.z }}
    </div>
</template>

<script>
import * as THREE from 'three';
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
export default {
    props: ['board', 'palette', 'player', 'playerLocation'],
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
            midy: 0
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
                // window.addEventListener('mousemove', this.mouseMove);
            });
            this.camera.position.z = 7;
        },
        initBoard() {
            this.group = new THREE.Group();
            const width = this.board.length;
            const height = this.board[0].length;
            this.midx = Math.floor(width/2);
            this.midy = Math.floor(height/2);
            // window.console.log("width: " + width + ", height: " + height + ", midx: " + midx + ", midy: " + midy);
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


            this.scene.add(this.group);
            this.group.rotation.x -= 0.8;
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
            
            window.console.log("rotation " + this.playerCube.rotation.z + ", facing " + this.playerLocation.facing);
            switch (this.playerLocation.facing) {
                case 'up':
                    this.playerCube.rotation.z = 0;
                    break;
                case 'left':
                    this.playerCube.rotation.z = 1.6;
                    break;
                case 'right':
                    this.playerCube.rotation.z = -1.6;
                    break;
                case 'down':
                    this.playerCube.rotation.z = 3.2;
            }
            window.console.log("rotation " + this.playerCube.rotation.z);
        },
        rotateLeft() {
            this.rotationIndex += 1;
            if (this.rotationIndex > 7) {
                this.rotationIndex = 0;
            }
            this.group.rotation.z = rotations[this.rotationIndex];
            this.animate();
        },
        rotateRight() {
            this.rotationIndex -= 1;
            if (this.rotationIndex < 0) {
                this.rotationIndex = 7;
            }
            this.group.rotation.z = rotations[this.rotationIndex];
            this.animate();
        },
        zoomIn() {
            this.camera.position.z -= 1;
            this.animate();
        },
        zoomOut() {
            this.camera.position.z += 1;
            this.animate();
        },
        forward() {
            this.group.position.y -= 1;
            this.camera.position.z -= 1;
            this.animate();
        },
        backward() {
            this.group.position.y += 1;
            this.camera.position.z += 1;
            this.animate();
        },
        left() {
            this.camera.position.x -= 1;
            this.animate();
        },
        right() {
            this.camera.position.x += 1;
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