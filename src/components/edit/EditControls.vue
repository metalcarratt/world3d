<template>
    <table class="controls">
        <tr>
            <KeyButton />
            <KeyButton @click="forward" keypress="W">↑</KeyButton>
            <KeyButton />
        </tr>
        <tr>
            <KeyButton @click="left" keypress="A">←</KeyButton>
            <KeyButton @click="backward" keypress="S">↓</KeyButton>
            <KeyButton @click="right" keypress="D">→</KeyButton>
        </tr>
        <tr>
            <KeyButton />
            <KeyButton @click="place" keypress="space">place</KeyButton>
            <KeyButton />
        </tr>
    </table>
</template>

<script>
import Modes from "@/components/modes/modes.js";
import brush from "@/components/edit/brush.js";
import playerUtil from '@/components/board/player.js';
import selectorUtil from '@/components/board/selector.js';
import keyboard from '@/components/keyboard.js';
import KeyButton from '@/components/ui/KeyButton.vue';

export default {
    components: { KeyButton },
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
</style>