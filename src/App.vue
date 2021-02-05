<template>
  <div id="app" >
    <GameBoard
      :board="map"
      :palette="palette"
      ref="gameBoard"
      :player="player"
      :playerLocation="playerLocation"
      :selectorLocation="selectorLocation"
    />
    <WalkControls :playerLocation="playerLocation" v-show="showWalkControls" />
    <EditControls :selectorLocation="selectorLocation" :playerLocation="playerLocation" v-show="showEditControls" />
    <ControlMode @changeMode="changeMode" />

  </div>
</template>

<script>
import Water from '@/models/water.js';
import Grass from '@/models/grass.js';
import Rock from '@/models/rock.js';
import Tree from '@/models/tree.js';
import Ghost from '@/models/ghost.js';
import GameBoard from '@/components/GameBoard.vue';
import WalkControls from '@/components/WalkControls.vue';
import EditControls from '@/components/edit/EditControls.vue';
import ControlMode from '@/components/modes/ControlMode.vue';
import Modes from "@/components/modes/modes.js";

export default {
  name: 'App',
  components: { GameBoard, WalkControls, EditControls, ControlMode },
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
      },
      selectorLocation: {
        x: 1, y: 2, z: 0.4, show: false
      }
    }
  },
  computed: {
    player() {
      return Ghost;
    },
    showWalkControls() {
      return Modes.isWalking();
    },
    showEditControls() {
      return Modes.isEditing();
    }
  },
  methods: {
    changeMode() {
      this.selectorLocation.show = Modes.isEditing();
      if (Modes.isEditing()) {
        this.selectorLocation.x = this.playerLocation.x;
        this.selectorLocation.y = this.playerLocation.y;
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