<template>
  <div id="app" >
    <GameBoard
      :palette="palette"
      ref="gameBoard"
      :player="player"
      :selectorLocation="selectorLocation"
    />
    <WalkControls v-show="showWalkControls" />
    <EditControls :selectorLocation="selectorLocation" v-show="showEditControls" @updateBoard="updateBoard" />
    <ControlMode @changeMode="changeMode" />

  </div>
</template>

<script>
import Water from '@/models/water.js';
import Grass from '@/models/grass.js';
import Rock from '@/models/rock.js';
import Tree from '@/models/tree.js';
import Ghost from '@/models/ghost.js';
import GameBoard from '@/components/board/GameBoard.vue';
import WalkControls from '@/components/WalkControls.vue';
import EditControls from '@/components/edit/EditControls.vue';
import ControlMode from '@/components/modes/ControlMode.vue';
import Modes from "@/components/modes/modes.js";
import board from '@/components/board/board.js';
import playerUtil from '@/components/board/player.js';

export default {
  name: 'App',
  components: { GameBoard, WalkControls, EditControls, ControlMode },
  data() {
    return {
      palette: {
        0: Water,
        1: Grass,
        2: Rock,
        3: Tree
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
        const playerLocation = playerUtil.getPlayerLocation()
        this.selectorLocation.x = playerLocation.x;
        this.selectorLocation.y = playerLocation.y;
      }
    },
    updateBoard({x, y, brush}) {
      board.updateBoard({x, y, brush, palette: this.palette});
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