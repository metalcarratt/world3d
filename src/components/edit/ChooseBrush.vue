<template>
    <Modal title="Choose brush" @close="$emit('close')" keypress="P">
        <div :class="['item', selected('water') ? 'selected' : '']" @click="selectedBrush = 'water'">
            <ShowBlock id="brush-water" brush="water" size="s100" />
        </div>

        <div :class="['item', selected('grass') ? 'selected' : '']" @click="selectedBrush = 'grass'">
            <ShowBlock id="brush-grass" brush="grass" size="s100" />
        </div>

        <div :class="['item', selected('rock') ? 'selected' : '']" @click="selectedBrush = 'rock'">
            <ShowBlock id="brush-rock" brush="rock" size="s100" />
        </div>

        <div :class="['item', selected('tree') ? 'selected' : '']" @click="selectedBrush = 'tree'">
            <ShowBlock id="brush-tree" brush="tree" size="s100" />
        </div>
        <div>
            <ModalButton @click="$emit('changeTo', selectedBrush)">Choose</ModalButton>
            <ModalButton @click="$emit('edit', selectedBrush)">Edit</ModalButton>
        </div>
    </Modal>
</template>

<script>
import ShowBlock from '@/components/edit/ShowBlock.vue';
import Modal from '@/components/ui/Modal.vue';

export default {
    data() {
        return {
            selectedBrush: ''
        }
    },
    components: { ShowBlock, Modal },
    methods: {
        selected(brush) {
            return this.selectedBrush === brush;
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