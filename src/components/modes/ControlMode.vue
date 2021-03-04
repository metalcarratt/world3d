<template>
    <div class="modes">
        <h2>Mode </h2><Keypress :inline="true">`</Keypress>
        <span :class="[isWalking() ? 'selected' : '', 'button']" @click="changeModeToWalking">Walk</span>
        <span :class="[isEditing() ? 'selected' : '', 'button']" @click="changeModeToEdit">Edit</span>
        <span v-if="isEditing()">
            <h2>Brush</h2>
            <ShowBlock id="brush" :brusho="getBrushModel()" @click.native="openChooseBrushModal" size="s100" :orientation="brushOrientation" />
            <button :class="brushOrientation === 'N' ? 'selected' : ''" @click="brushOrientation = 'N'">N</button>
            <button :class="brushOrientation === 'S' ? 'selected' : ''" @click="brushOrientation = 'S'">S</button>
            <button :class="brushOrientation === 'E' ? 'selected' : ''" @click="brushOrientation = 'E'">E</button>
            <button :class="brushOrientation === 'W' ? 'selected' : ''" @click="brushOrientation = 'W'">W</button>
        </span>
        <button class="fullWidth">Textures</button>
    </div>
</template>

<script>
import Modes from "./modes.js";
import brush from "@/components/edit/brush.js";
import selectorUtil from '@/components/board/selector.js';
import playerUtil from '@/components/board/player.js';
import ShowBlock from '@/components/edit/ShowBlock.vue';
import Keypress from '@/components/Keypress.vue';
import ChooseBrush from '@/components/edit/ChooseBrush.vue';
import EditBrushModal from '@/components/edit/EditBrushModal.vue';
import keyboard from '@/components/keyboard.js';
import modelUtil from '@/components/terrain/models.js';
import modalEventBus from '@/components/ui/modal/modalEventBus.js';

export default {
    components: { ShowBlock, Keypress, ChooseBrush, EditBrushModal },
    data() {
        return {
            showChooseBrushModal: false,
            showEditBrushModal: false,
            selectedEditBrush: ''
        }
    },
    computed: {
        brush: {
            set(newBrush) {
                brush.setBrush(newBrush);
            },
            get() {
                return brush.getBrush();
            }
        },
        brushOrientation: {
            set(newOrientation) {
                brush.setOrientation(newOrientation);
            },
            get() {
                return brush.getOrientation();
            }
        }
    },
    mounted() {
        this.brush = 'Water';

        keyboard.registerInterest({
            name: "ControlMode",
            key: keyboard.TILDE,
            condition: () => !this.showChooseBrushModal,
            callback: () => {
                if (this.isWalking()) {
                    this.changeModeToEdit();
                } else if (!this.showChooseBrushModal) {
                    this.changeModeToWalking();
                }
            }
        });
    },
    methods: {
        getBrushModel() {
            return modelUtil.getModelForName(this.brush);
        },
        isWalking() {
            return Modes.isWalking();
        },
        isEditing() {
            return Modes.isEditing();
        },
        changeModeToWalking() {
            Modes.setWalking();
            this.changeMode();
        },
        changeModeToEdit() {
            Modes.setEditing();
            this.changeMode();
        },
        changeMode() {
            selectorUtil.updateSelectorLocation({show: Modes.isEditing()});
            if (Modes.isEditing()) {
                const playerLocation = playerUtil.getPlayerLocation()
                selectorUtil.updateSelectorLocation({x: playerLocation.x});
                selectorUtil.updateSelectorLocation({y: playerLocation.y});
            }
            selectorUtil.positionSelector();
        },
        openChooseBrushModal() {
            modalEventBus.openModal(modalEventBus.CHOOSE_BRUSH_MODAL);
        }
    }
}
</script>

<style scoped>
h2 {
    font-size: 16px;
    font-weight: 700;
    font-family: sans-serif;
    display: inline-block;
    margin-right: 4px;
}

div.modes {
  position: absolute;
  top: 30px;
  right: 10px;

  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px;
}

div.modes span.button {
    display: block;
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px;
    background-color: #ccc;
    user-select: none
}

div.modes span.button.selected {
    background-color: yellow;
}

div.modes span:not(.selected):hover {
    cursor: pointer;
}

div.modes span.button + span.button {
    margin-top: 4px;
}

button.selected {
    background-color: yellow;
}

button.fullWidth {
    display: block;
}
</style>