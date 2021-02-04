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
export default {
    props: ['playerLocation'],
    mounted() {
        window.addEventListener("keypress", this.keyboard);
    },
    methods: {
        keyboard(e) {
        console.log(e.keyCode);
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
        },
        strafeLeft() {
            switch (this.playerLocation.facing) {
                case 'up':
                this.playerLocation.x = this.playerLocation.x - 1;
                break;
                case 'left':
                this.playerLocation.y = this.playerLocation.y - 1;
                break;
                case 'down':
                this.playerLocation.x = this.playerLocation.x + 1;
                break;
                case 'right':
                this.playerLocation.y = this.playerLocation.y + 1;
                break;
            }
        },
        strafeRight() {
            switch (this.playerLocation.facing) {
                case 'up':
                this.playerLocation.x = this.playerLocation.x + 1;
                break;
                case 'left':
                this.playerLocation.y = this.playerLocation.y + 1;
                break;
                case 'down':
                this.playerLocation.x = this.playerLocation.x - 1;
                break;
                case 'right':
                this.playerLocation.y = this.playerLocation.y - 1;
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