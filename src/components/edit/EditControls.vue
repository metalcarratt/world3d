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
import playerUtil from '@/components/board/player.js';
import selectorUtil from '@/components/board/selector.js';

export default {
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
            const playerLocation = playerUtil.getPlayerLocation();
            const selectorLocation = selectorUtil.getSelectorLocation();
            switch (playerLocation.facing) {
                case 'up':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y + 1});
                    break;
                case 'down':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y - 1});
                    break;
                case 'left':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x - 1});
                    break;
                case 'right':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x + 1});
                    break;
            }
            selectorUtil.positionSelector();
        },
        backward() {
            const playerLocation = playerUtil.getPlayerLocation();
            const selectorLocation = selectorUtil.getSelectorLocation();
            switch (playerLocation.facing) {
                case 'up':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y - 1});
                    break;
                case 'down':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y + 1});
                    break;
                case 'left':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x + 1});
                    break;
                case 'right':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x - 1});
                    break;
            }
            selectorUtil.positionSelector();
        },
        left() {
            const playerLocation = playerUtil.getPlayerLocation();
            const selectorLocation = selectorUtil.getSelectorLocation();
            switch (playerLocation.facing) {
                case 'up':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x - 1});
                    break;
                case 'down':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x + 1});
                    break;
                case 'left':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y - 1});
                    break;
                case 'right':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y + 1});
                    break;
            }
            selectorUtil.positionSelector();
        },
        right() {
            const playerLocation = playerUtil.getPlayerLocation();
            const selectorLocation = selectorUtil.getSelectorLocation();
            switch (playerLocation.facing) {
                case 'up':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x + 1});
                    break;
                case 'down':
                    selectorUtil.updateSelectorLocation({x: selectorLocation.x - 1});
                    break;
                case 'left':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y + 1});
                    break;
                case 'right':
                    selectorUtil.updateSelectorLocation({y: selectorLocation.y - 1});
                    break;
            }
            selectorUtil.positionSelector();
        },
        place() {
            window.console.log("place");
            const selectorLocation = selectorUtil.getSelectorLocation();
            this.$emit('updateBoard', {
                x: selectorLocation.x,
                y: selectorLocation.y,
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