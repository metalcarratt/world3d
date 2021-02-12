<template>
    <table class="controls">
        <tr>
            <td class="empty"></td>
            <td @click="forward">↑ <Keypress>W</Keypress></td>
            <td class="empty"></td>
        </tr>
        <tr>
            <td @click="left">← <Keypress>A</Keypress></td>
            <td @click="backward">↓ <Keypress>S</Keypress></td>
            <td @click="right">→ <Keypress>D</Keypress></td>
        </tr>
        <tr>
            <td class="empty"></td>
            <td @click="place">place <Keypress>space</Keypress></td>
            <td class="empty"></td>
        </tr>
    </table>
</template>

<script>
import Modes from "@/components/modes/modes.js";
import brush from "@/components/edit/brush.js";
import playerUtil from '@/components/board/player.js';
import selectorUtil from '@/components/board/selector.js';
import Keypress from '@/components/Keypress.vue';
import keyboard from '@/components/keyboard.js';

export default {
    components: {Keypress },
    mounted() {
        keyboard.registerAll({
            name: "EditControls",
            condition: () => Modes.isEditing(),
            registrations: [
                {
                    key: keyboard.W,
                    callback: () => this.forward()
                },
                {
                    key: keyboard.S,
                    callback: () => this.backward()
                },
                {
                    key: keyboard.A,
                    callback: () => this.left()        
                },
                {
                    key: keyboard.D,
                    callback: () => this.right()        
                },
                {
                    key: keyboard.SPACE,
                    callback: () => this.place()
                }
            ]
        });
    },
    methods: {
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
  text-align: center;
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