<template>
    <div class="modes">
        <span :class="isWalking() ? 'selected' : ''" @click="changeModeToWalking">Walk</span>
        <span :class="isEditing() ? 'selected' : ''" @click="changeModeToEdit">Edit</span>
    </div>
</template>

<script>
import Modes from "./modes.js";

export default {
    methods: {
        isWalking() {
            return Modes.isWalking();
        },
        isEditing() {
            return Modes.isEditing();
        },
        changeModeToWalking() {
            Modes.setWalking();
            this.$emit('changeMode');
        },
        changeModeToEdit() {
            Modes.setEditing();
            this.$emit('changeMode');
        }
    }
}
</script>

<style scoped>
div.modes {
  position: absolute;
  top: 30px;
  right: 10px;

  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
}

div.modes span {
    display: block;
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px;
    background-color: #ccc;
    user-select: none
}

div.modes span.selected {
    background-color: yellow;
}

div.modes span:not(.selected):hover {
    cursor: pointer;
}

div.modes span + span {
    margin-top: 4px;
}
</style>