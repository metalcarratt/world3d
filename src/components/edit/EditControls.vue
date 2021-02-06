<template>
    <table class="controls">
        <tr>
            <td class="empty"></td>
            <td @click="forward">↑ W</td>
            <td class="empty"></td>
        </tr>
        <tr>
            <td @click="left">← A</td>
            <td @click="backward">↓ S</td>
            <td @click="right">→ D</td>
        </tr>
        <tr>
            <td class="empty"></td>
            <td @click="place">space place</td>
            <td class="empty"></td>
        </tr>
    </table>
</template>

<script>
import Modes from "@/components/modes/modes.js";
import brush from "@/components/edit/brush.js";

export default {
    props: ['selectorLocation', 'playerLocation'],
    mounted() {
        window.addEventListener("keypress", this.keyboard);
    },
    methods: {
        keyboard(e) {
            if (Modes.isEditing()) {
                console.log(e.keyCode);
                switch (e.keyCode) {
                    case 87: // W
                    case 119:
                        this.forward();
                        break;
                    case 83: // S
                    case 115:
                        this.backward();
                        break;
                    case 97: // A
                        this.left();
                        break;
                    case 100: // D
                        this.right();
                        break;
                    case 32: // space
                        this.place();
                        break;
                    default:
                        return;
                }
                e.preventDefault();
            }
        },
        forward() {
            switch (this.playerLocation.facing) {
                case 'up':
                    this.selectorLocation.y = this.selectorLocation.y + 1;
                    break;
                case 'down':
                    this.selectorLocation.y = this.selectorLocation.y - 1;
                    break;
                case 'left':
                    this.selectorLocation.x = this.selectorLocation.x - 1;
                    break;
                case 'right':
                    this.selectorLocation.x = this.selectorLocation.x + 1;
                    break;
            }
        },
        backward() {
            switch (this.playerLocation.facing) {
                case 'up':
                    this.selectorLocation.y = this.selectorLocation.y - 1;
                    break;
                case 'down':
                    this.selectorLocation.y = this.selectorLocation.y + 1;
                    break;
                case 'left':
                    this.selectorLocation.x = this.selectorLocation.x + 1;
                    break;
                case 'right':
                    this.selectorLocation.x = this.selectorLocation.x - 1;
                    break;
            }
        },
        left() {
            switch (this.playerLocation.facing) {
                case 'up':
                    this.selectorLocation.x = this.selectorLocation.x - 1;
                    break;
                case 'down':
                    this.selectorLocation.x = this.selectorLocation.x + 1;
                    break;
                case 'left':
                    this.selectorLocation.y = this.selectorLocation.y - 1;
                    break;
                case 'right':
                    this.selectorLocation.y = this.selectorLocation.y + 1;
                    break;
            }
        },
        right() {
            switch (this.playerLocation.facing) {
                case 'up':
                    this.selectorLocation.x = this.selectorLocation.x + 1;
                    break;
                case 'down':
                    this.selectorLocation.x = this.selectorLocation.x - 1;
                    break;
                case 'left':
                    this.selectorLocation.y = this.selectorLocation.y + 1;
                    break;
                case 'right':
                    this.selectorLocation.y = this.selectorLocation.y - 1;
                    break;
            }
        },
        place() {
            window.console.log("place");
            this.$emit('updateBoard', {
                x: this.selectorLocation.x,
                y: this.selectorLocation.y,
                brush: brush.getBrush()
            });
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

table.controls td.empty {
    background-color: #00000000;
    border: none;
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