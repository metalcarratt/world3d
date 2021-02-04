<template>
    <div id="gameBoard">
        Camera: x={{camera.position.x}} y={{camera.position.y}} z={{camera.position.z}} + rotation: x={{ camera.rotation.x }} y={{ camera.rotation.y}} z={{ camera.rotation.z }}
        Scene rotation: x={{ group.rotation.x }} y={{ group.rotation.y }} z={{ group.rotation.z }}
        
        
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

const UP = 'up';
// const DOWN = 'down';
// const LEFT = 'left';
// const RIGHT = 'right';

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
            midy: 0,
            Y_AXIS: null,
            camera_pivot: null,
            playerOldFacing: UP,
            cface: 'N'
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
                // window.addEventListener('mousemove', this.mouseMove);
            });
            // this.camera.position.z = 4;
            // this.camera.position.y = -3;
            // this.camera.lookAt(0,0,0);

            this.camera_pivot = new THREE.Object3D()
            this.Y_AXIS = new THREE.Vector3( 0, 1, 1 );
            this.scene.add( this.camera_pivot );
            this.camera_pivot.add( this.camera );
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
            // this.group.rotation.x -= 0.8;
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

            // const xoffset = this.playerCube.position.x;
            this.group.position.x = 0 - this.playerCube.position.x;
            // const yoffset = this.playerCube.position.y;
            this.group.position.y = 0 - this.playerCube.position.y;
            
            // window.console.log("rotation " + playerCube.rotation.z + ", facing " + playerLocation.facing);
            RotateCamera.rotate({
                playerLocation: this.playerLocation,
                playerOldFacing: this.playerOldFacing,
                playerCube: this.playerCube,
                camera: this.camera
            })
            // if (this.playerLocation.facing !== this.playerOldFacing) {
            //     switch(this.playerOldFacing) {
            //         case UP:
            //             switch (this.playerLocation.facing) {
            //                 // case LEFT:

            //                 case RIGHT:
            //                     setTimeout(() => {
            //                         RotateCamera.faceNorthEast(this.playerCube, this.camera)
            //                         setTimeout(() => RotateCamera.faceEast(this.playerCube, this.camera), 400);
            //                     }, 400);
            //             }   
            //             break;
            //         case DOWN:
            //         case LEFT:
            //         case RIGHT:
            //     }
            // } else {
            //     switch (this.playerLocation.facing) {
            //         case UP:
            //             RotateCamera.faceNorth(this.playerCube, this.camera);
            //             break;
            //         case LEFT:
            //             RotateCamera.faceNorthEast(this.playerCube, this.camera);
            //             // faceWest(playerCube, camera);
            //             break;
            //         case RIGHT:
            //             RotateCamera.faceEast(this.playerCube, this.camera);
            //             break;
            //         case DOWN:
            //             RotateCamera.faceSouth(this.playerCube, this.camera);
            //             break;
            //     }
            // }

            
            this.animate();
            this.playerOldFacing = this.playerLocation.facing;
            
        },
        // rotateLeft() {
        //     this.rotationIndex += 1;
        //     if (this.rotationIndex > 7) {
        //         this.rotationIndex = 0;
        //     }
        //     this.group.rotation.z = rotations[this.rotationIndex];
        //     this.animate();
        // },
        // rotateRight() {
        //     this.rotationIndex -= 1;
        //     if (this.rotationIndex < 0) {
        //         this.rotationIndex = 7;
        //     }
        //     this.group.rotation.z = rotations[this.rotationIndex];
        //     this.animate();
        // },
        // zoomIn() {
        //     this.camera.position.z -= 1;
        //     this.animate();
        // },
        // zoomOut() {
        //     this.camera.position.z += 1;
        //     this.animate();
        // },
        // forward() {
        //     this.group.position.y -= 1;
        //     this.camera.position.z -= 1;
        //     this.animate();
        // },
        // backward() {
        //     this.group.position.y += 1;
        //     this.camera.position.z += 1;
        //     this.animate();
        // },
        // left() {
        //     this.camera.position.x -= 1;
        //     this.animate();
        // },
        // right() {
        //     this.camera.position.x += 1;
        //     this.animate();
        // }
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