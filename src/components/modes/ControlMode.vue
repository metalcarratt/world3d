<template>
    <div class="modes">
        <span :class="isWalking() ? 'selected' : ''" @click="changeModeToWalking">Walk</span>
        <span :class="isEditing() ? 'selected' : ''" @click="changeModeToEdit">Edit</span>
        <select v-model="brush" v-if="isEditing()">
            <option>water</option>
            <option>grass</option>
            <option>rock</option>
            <option>tree</option>
        </select>
    </div>
</template>

<script>
import Modes from "./modes.js";
import brush from "@/components/edit/brush.js";

export default {
    mounted() {
        window.addEventListener("keypress", this.keyboard);
    },
    computed: {
        brush: {
            set(newBrush) {
                brush.setBrush(newBrush);
            },
            get() {
                return brush.getBrush();
            }
        }
    },
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
        },
        keyboard(e) {
            switch (e.keyCode) {
                case 96: // ~
                    if (this.isWalking()) {
                        this.changeModeToEdit();
                    } else {
                        this.changeModeToWalking();
                    }
                    break;
            }
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