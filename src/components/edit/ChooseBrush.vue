<template>
    <Modal title="Choose brush" @close="$emit('close')" keypress="P">
        <div
            v-for="model in allModels"
            :class="['item', selected(model) ? 'selected' : '']"
            :key="model"
            @click="selectedBrush = model"
        >
            {{ model }}
            <ShowBlock :id="'brush-' + model" :brusho="getModel(model)" size="s100"/>
        </div>

        <div>
            <ModalButton @click="$emit('changeTo', selectedBrush)">Choose</ModalButton>
            <ModalButton @click="$emit('edit', selectedBrush)">Edit</ModalButton>
            <ModalButton @click="$emit('edit', 'new')">New</ModalButton>
        </div>
    </Modal>
</template>

<script>
import ShowBlock from '@/components/edit/ShowBlock.vue';
import Modal from '@/components/ui/Modal.vue';
import modelUtil from '@/components/models.js';

export default {
    data() {
        return {
            selectedBrush: 'water'
        }
    },
    components: { ShowBlock, Modal },
    computed: {
        allModels: () => modelUtil.allModels
    },
    methods: {
        selected(brush) {
            return this.selectedBrush === brush;
        },
        getModel(modelName) {
            // window.console.log(`ChooseBrush#getModel(${modelName})`);
            return modelUtil.getModelForName(modelName);
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
</style>