<template>
    <div class="modes">
        <h2>Mode </h2><Keypress :inline="true">`</Keypress>
        <span :class="[isWalking() ? 'selected' : '', 'button']" @click="changeModeToWalking">Walk</span>
        <span :class="[isEditing() ? 'selected' : '', 'button']" @click="changeModeToEdit">Edit</span>
        <span v-if="isEditing()">
            <h2>Brush</h2><Keypress :inline="true">P</Keypress>
            <ShowBlock id="brush" :brush="brush" @click.native="openChooseBrushModal" size="s100" />
        </span>
        <ChooseBrush v-show="showChooseBrushModal" @changeTo="updateBrush" @close="closeChooseBrushModal" @edit="openEditBrushModal" />
        <EditBrushModal v-show="showEditBrushModal" :visible="showEditBrushModal" @close="closeEditBrushModal" :editBrush="selectedEditBrush" />
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
        }
    },
    mounted() {
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

        keyboard.registerInterest({
            name: "ControlMode",
            key: keyboard.P,
            condition: () => this.isEditing(),
            callback: () => this.showChooseBrushModal = !this.showChooseBrushModal
        });
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
            this.changeMode();
        },
        changeModeToEdit() {
            Modes.setEditing();
            this.changeMode();
        },
        changeMode() {
            // const selectorLocation = selectorUtil.getSelectorLocation();
            selectorUtil.updateSelectorLocation({show: Modes.isEditing()});
            if (Modes.isEditing()) {
                const playerLocation = playerUtil.getPlayerLocation()
                selectorUtil.updateSelectorLocation({x: playerLocation.x});
                selectorUtil.updateSelectorLocation({y: playerLocation.y});
            }
            selectorUtil.positionSelector();
            // board.positionSelector(this.selectorLocation);
        },
        updateBrush(newBrush) {
            this.brush = newBrush;
            this.closeChooseBrushModal();
        },
        openChooseBrushModal() {
            this.showChooseBrushModal = true
            Modes.modalOpened();
        },
        closeChooseBrushModal() {
            this.showChooseBrushModal = false;
            Modes.modalClosed();
        },
        openEditBrushModal(selectedBrush) {
            this.closeChooseBrushModal();
            this.selectedEditBrush = selectedBrush;
            this.showEditBrushModal = true;
        },
        closeEditBrushModal() {
            this.showEditBrushModal = false;
            this.openChooseBrushModal();
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
</style>