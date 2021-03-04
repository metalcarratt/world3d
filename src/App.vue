<template>
  <div id="app" >
    <GameBoard
      ref="gameBoard"
    />
    <WalkControls v-show="showWalkControls" />
    <EditControls v-show="showEditControls" @updateBoard="updateBoard" />
    <ControlMode />
    <SystemControls />
    <ModalController />
  </div>
</template>

<script>
import GameBoard from '@/components/board/GameBoard.vue';
import WalkControls from '@/components/WalkControls.vue';
import EditControls from '@/components/edit/EditControls.vue';
import ControlMode from '@/components/modes/ControlMode.vue';
import SystemControls from '@/components/system/SystemControls.vue';
import Modes from "@/components/modes/modes.js";
import board from '@/components/board/board.js';
import keyboard from '@/components/keyboard.js';
import ModalController from '@/components/ui/modal/ModalController.vue';

export default {
  name: 'App',
  components: { GameBoard, WalkControls, EditControls, SystemControls, ControlMode, ModalController },
  mounted() {
    window.addEventListener("keypress", keyboard.handleKeyPress);
  },
  computed: {
    showWalkControls() {
      return Modes.isWalking();
    },
    showEditControls() {
      return Modes.isEditing();
    }
  },
  methods: {
    updateBoard({x, y, brush, orientation}) {
      board.updateBoard({x, y, brush, orientation});
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