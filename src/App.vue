<template>
  <div id="app" >
    <GameBoard
      :palette="palette"
      ref="gameBoard"
      :player="player"
    />
    <WalkControls v-show="showWalkControls" />
    <EditControls v-show="showEditControls" @updateBoard="updateBoard" />
    <ControlMode />

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