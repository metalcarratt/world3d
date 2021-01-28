<template>
  <div id="app" >
    <button @click="keyLeft">Roll Left</button>
    <button @click="keyRight">Roll Right</button>
    <button @click="zoomIn">Zoom In</button>
    <button @click="zoomOut">Zoom Out</button>
    <button @click="forward">Forward</button>
    <button @click="backward">Backward</button>
    <button @click="left">Left</button>
    <button @click="right">Right</button>
    |
    Player:
    <button @click="playerForward">Forward</button>
    <button @click="playerBackward">Backward</button>
    <button @click="playerLeft">Left</button>
    <button @click="playerRight">Right</button>
    <GameBoard :board="map" :palette="palette" ref="gameBoard" :player="player" :playerLocation="playerLocation" />
  </div>
</template>

<script>
// import * as THREE from 'three';
import Water from '@/models/water.js';
import Grass from '@/models/grass.js';
import Rock from '@/models/rock.js';
import Tree from '@/models/tree.js';
import Ghost from '@/models/ghost.js';
import GameBoard from '@/components/GameBoard.vue';
export default {
  name: 'App',
  components: { GameBoard },
  data() {
    return {
      map: [
        [0,0,0,0,0,0,0],
        [0,1,1,1,1,1,0],
        [0,1,2,3,2,1,0],
        [0,1,1,2,1,0,0],
        [0,0,0,0,0,0,0]
      ],
      palette: {
        0: Water,
        1: Grass,
        2: Rock,
        3: Tree
      },
      playerLocation: {
        x: 1, y: 1, z: 0, facing: 'up'
      }
    }
  },
  mounted() {
    window.addEventListener("keypress", this.keyboard);
  },
  computed: {
    player() {
      return Ghost;
    }
  },
  methods: {
    keyboard(e) {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 87:
        case 119:
          this.playerForward();
          // this.forward();
          break;
        case 83:
        case 115:
          this.playerBackward();
          // this.backward();
          break;
        case 97:
          this.playerLeft();
          // this.keyRight();
          // this.keyRight();
          break;
        case 100:
          this.playerRight();
          // this.keyLeft();
          // this.keyLeft();
          break;
        case 43:
          this.zoomIn();
          break;
        case 45:
          this.zoomOut();
          break;
        case 52:
          this.keyLeft();
          break;
        case 54:
          this.keyRight();
          break;
      }
    },
    keyLeft() {
      this.$refs.gameBoard.rotateLeft();
    },
    keyRight() {
      this.$refs.gameBoard.rotateRight();
    },
    zoomIn() {
      this.$refs.gameBoard.zoomIn();
    },
    zoomOut() {
      this.$refs.gameBoard.zoomOut();
    },
    forward() {
      this.$refs.gameBoard.forward();
    },
    backward() {
      this.$refs.gameBoard.backward();
    },
    left() {
      this.$refs.gameBoard.left();
    },
    right() {
      this.$refs.gameBoard.right();
    },
    playerForward() {
      switch (this.playerLocation.facing) {
        case 'up':
          this.playerLocation.y = this.playerLocation.y + 1;
          break;
        case 'left':
          this.playerLocation.x = this.playerLocation.x - 1;
          break;
        case 'down':
          this.playerLocation.y = this.playerLocation.y - 1;
          break;
        case 'right':
          this.playerLocation.x = this.playerLocation.x + 1;
          break;
      }
    },
    playerBackward() {
      switch (this.playerLocation.facing) {
        case 'up':
          this.playerLocation.y = this.playerLocation.y - 1;
          break;
        case 'left':
          this.playerLocation.x = this.playerLocation.x + 1;
          break;
        case 'down':
          this.playerLocation.y = this.playerLocation.y + 1;
          break;
        case 'right':
          this.playerLocation.x = this.playerLocation.x - 1;
          break;
      }
    },
    playerLeft() {
      switch (this.playerLocation.facing) {
        case 'up':
          this.playerLocation.facing = 'left';
          break;
        case 'left':
          this.playerLocation.facing = 'down';
          break;
        case 'down':
          this.playerLocation.facing = 'right';
          break;
        case 'right':
          this.playerLocation.facing = 'up';
          break;
      }
    },
    playerRight() {
      switch (this.playerLocation.facing) {
        case 'up':
          this.playerLocation.facing = 'right';
          break;
        case 'left':
          this.playerLocation.facing = 'up';
          break;
        case 'down':
          this.playerLocation.facing = 'left';
          break;
        case 'right':
          this.playerLocation.facing = 'down';
          break;
      }
    }
  }
}
</script>

<style>
body {
	margin: 0;
	background-color: white;
}
</style>