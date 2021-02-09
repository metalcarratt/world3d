<template>
    <table class="controls">
      <tr>
        <td @click="strafeLeft">◄ Q</td>
        <td @click="playerForward">↑ W</td>
        <td @click="strafeRight">► E</td>
      </tr>
      <tr>
        <td @click="playerLeft">← A</td>
        <td @click="playerBackward">↓ S</td>
        <td @click="playerRight">→ D</td>
      </tr>
    </table>
</template>

<script>
import Modes from "@/components/modes/modes.js";
import playerUtil from '@/components/board/player.js';

export default {
    mounted() {
        window.addEventListener("keypress", this.keyboard);
    },
    methods: {
        keyboard(e) {
            if (Modes.isWalking()) {
                // console.log(e.keyCode);
                switch (e.keyCode) {
                    case 87: // W
                    case 119:
                        this.playerForward();
                        break;
                    case 83: // S
                    case 115:
                        this.playerBackward();
                        break;
                    case 97: // A
                        this.playerLeft();
                        break;
                    case 100: // D
                        this.playerRight();
                        break;
                    case 113: // Q
                        this.strafeLeft();
                        break;
                    case 101: // E
                        this.strafeRight();
                        break;
                }
            }
        },
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