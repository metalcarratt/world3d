<template>
  <div id="app" >
    <GameBoard :board="map" :palette="palette" ref="gameBoard" :player="player" :playerLocation="playerLocation" />
    <WalkControls :playerLocation="playerLocation" />

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
import WalkControls from '@/components/WalkControls.vue';

export default {
  name: 'App',
  components: { GameBoard, WalkControls },
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
  computed: {
    player() {
      return Ghost;
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