<template>
    <Modal title="Choose brush" @close="$emit('close')" keypress="P">
        <h3>Base brushes</h3>
        <div
            v-for="model in allModels"
            :class="['item', selected(model) ? 'selected' : '']"
            :key="model"
            @click="selectedBrush = model"
        >
            {{ model }}
            <ShowBlock :id="'brush-' + model" :brusho="getModel(model)" size="s100"/>
        </div>

        <h3>Special</h3>
        <div
            v-for="model in specialModels"
            :class="['item', selected(model) ? 'selected' : '']"
            :key="model"
            @click="selectedBrush = model"
        >
            {{ model }}
            <ShowBlock :id="'brush-' + model" :brusho="getModel(model)" size="s100"/>
        </div>

        <h3>User created</h3>
        <div
            v-for="model in userCreated"
            :class="['item', selected(model) ? 'selected' : '']"
            :key="model"
            @click="selectedBrush = model"
        >
            {{ model }}
            <ShowBlock :id="'brush-' + model" :brusho="getTerrainModel(model)" size="s100"/>
        </div>

        <div>
            <ModalButton @click="chooseBrush">Choose</ModalButton>
            <ModalButton @click="editBrush">Edit</ModalButton>
            <ModalButton @click="newBrush">New</ModalButton>
        </div>
    </Modal>
</template>

<script>
import ShowBlock from '@/components/edit/ShowBlock.vue';
import Modal from '@/components/ui/modal/Modal.vue';
import modelUtil from '@/components/terrain/models.js';
import terrainUtil from '@/components/terrain/terrain.js';
import brush from '@/components/edit/brush.js';
import modalEventBus from '@/components/ui/modal/modalEventBus.js';

export default {
    data() {
        return {
            selectedBrush: 'water'
        }
    },
    components: { ShowBlock, Modal },
    computed: {
        allModels: () => modelUtil.allModels,
        specialModels: () => modelUtil.specialModels,
        userCreated: () => terrainUtil.listTerrain()
    },
    methods: {
        selected(brush) {
            return this.selectedBrush === brush;
        },
        getModel(modelName) {
            return modelUtil.getModelForName(modelName);
        },
        getTerrainModel(terrainName) {
            return terrainUtil.loadTerrain(terrainName).polygon;
        },
        chooseBrush() {
            brush.setBrush(this.selectedBrush);
            this.$emit('close');
        },
        editBrush() {
            modalEventBus.openModal(modalEventBus.EDIT_BRUSH_MODAL, {
                editBrush: this.selectedBrush
            });
        },
        newBrush() {
            modalEventBus.openModal(modalEventBus.EDIT_BRUSH_MODAL, {
                editBrush: 'new'
            });
        }
    }
}
</script>

<style scoped>
div.item {
    display: inline-block;
    padding: 6px;
    border-radius: 4px;
}

div.item.selected {
    background-color: yellow;
}

div.item:not(.selected):hover {
    cursor: pointer;
    background-color: #aaa;
}

h3 {
    margin-top: 0;
    margin-bottom: 0;
    border-bottom: 1px solid #aaa;
}
</style>