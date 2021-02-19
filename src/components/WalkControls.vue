<template>
    <table class="controls">
      <tr>
        <KeyButton @click="playerLeft" keypress="Q">◄</KeyButton>
        <KeyButton @click="playerForward" keypress="W">↑</KeyButton>
        <KeyButton @click="playerRight" keypress="E">►</KeyButton>
      </tr>
      <tr>
        <KeyButton @click="strafeLeft" keypress="A">←</KeyButton>
        <KeyButton @click="playerBackward" keypress="S">↓</KeyButton>
        <KeyButton @click="strafeRight" keypress="D">→</KeyButton>
      </tr>
    </table>
</template>

<script>
import Modes from "@/components/modes/modes.js";
import playerUtil from '@/components/board/player.js';
import keyboard from '@/components/keyboard.js';
import KeyButton from '@/components/ui/KeyButton.vue';

export default {
    components: { KeyButton },
    mounted() {
        keyboard.registerAll({
            name: "WalkControls",
            condition: () => Modes.isWalking(),
            registrations: [
                {
                    key: keyboard.W,
                    callback: () => this.playerForward()
                },
                {
                    key: keyboard.S,
                    callback: () => this.playerBackward()
                },
                {
                    key: keyboard.A,
                    callback: () => this.strafeLeft()        
                },
                {
                    key: keyboard.D,
                    callback: () => this.strafeRight()        
                },
                {
                    key: keyboard.Q,
                    callback: () => this.playerLeft()
                },
                {
                    key: keyboard.E,
                    callback: () => this.playerRight()
                }
            ]
        });
    },
    methods: {
        playerForward() {
            const playerLocation = playerUtil.getPlayerLocation();
            switch (playerLocation.facing) {
                case 'up':
                    playerUtil.updatePlayerLocation({y: playerLocation.y + 1});
                    break;
                case 'left':
                    playerUtil.updatePlayerLocation({x: playerLocation.x - 1});
                    break;
                case 'down':
                    playerUtil.updatePlayerLocation({y: playerLocation.y - 1});
                    break;
                case 'right':
                    playerUtil.updatePlayerLocation({x: playerLocation.x + 1});
                    break;
            }
        },
        playerBackward() {
            const playerLocation = playerUtil.getPlayerLocation();
            switch (playerLocation.facing) {
                case 'up':
                    playerUtil.updatePlayerLocation({y: playerLocation.y - 1});
                    break;
                case 'left':
                    playerUtil.updatePlayerLocation({x: playerLocation.x + 1});
                    break;
                case 'down':
                    playerUtil.updatePlayerLocation({y: playerLocation.y + 1});
                    break;
                case 'right':
                    playerUtil.updatePlayerLocation({x: playerLocation.x - 1});
                    break;
            }
        },
        playerLeft() {
            const playerLocation = playerUtil.getPlayerLocation();
            switch (playerLocation.facing) {
                case 'up':
                    playerUtil.updatePlayerLocation({facing: 'left'});
                    break;
                case 'left':
                    playerUtil.updatePlayerLocation({facing: 'down'});
                    break;
                case 'down':
                    playerUtil.updatePlayerLocation({facing: 'right'});
                    break;
                case 'right':
                    playerUtil.updatePlayerLocation({facing: 'up'});
                    break;
            }
        },
        playerRight() {
            const playerLocation = playerUtil.getPlayerLocation();
            switch (playerLocation.facing) {
                case 'up':
                    playerUtil.updatePlayerLocation({facing: 'right'});
                    break;
                case 'left':
                    playerUtil.updatePlayerLocation({facing: 'up'});
                    break;
                case 'down':
                    playerUtil.updatePlayerLocation({facing: 'left'});
                    break;
                case 'right':
                    playerUtil.updatePlayerLocation({facing: 'down'});
                    break;
            }
        },
        strafeLeft() {
            const playerLocation = playerUtil.getPlayerLocation();
            switch (playerLocation.facing) {
                case 'up':
                    playerUtil.updatePlayerLocation({x: playerLocation.x - 1});
                    break;
                case 'left':
                    playerUtil.updatePlayerLocation({y: playerLocation.y - 1});
                    break;
                case 'down':
                    playerUtil.updatePlayerLocation({x: playerLocation.x + 1});
                    break;
                case 'right':
                    playerUtil.updatePlayerLocation({y: playerLocation.y + 1});
                    break;
            }
        },
        strafeRight() {
            const playerLocation = playerUtil.getPlayerLocation();
            switch (playerLocation.facing) {
                case 'up':
                    playerUtil.updatePlayerLocation({x: playerLocation.x + 1});
                    break;
                case 'left':
                    playerUtil.updatePlayerLocation({y: playerLocation.y + 1});
                    break;
                case 'down':
                    playerUtil.updatePlayerLocation({x: playerLocation.x - 1});
                    break;
                case 'right':
                    playerUtil.updatePlayerLocation({y: playerLocation.y - 1});
                    break;
            }
        }
    }
}
</script>

<style scoped>
table.controls {
  position: absolute;
  top: 20px;
}

table.controls td {
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  user-select: none;
  text-align: center;
}

table.controls td:hover {
  background-color: #aaa;
  cursor: pointer;
}

@media (hover: none) {
  table.controls td {
    width: 50px;
    height: 50px;
  }
}
</style>