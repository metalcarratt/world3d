<template>
    <Modal title="Load Map" @close="$emit('close')" size="medium">
        <ul>
            <li
                v-for="world in worlds"
                :class="selected(world) ? 'selected' : ''"
                :key="world"
                @click="selectedWorld = world"
            >
                {{ world }}
            </li>
        </ul>
        <ModalButton @click="loadMap">Load</ModalButton>
        <ModalButton @click="removeMap">Remove</ModalButton>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/modal/Modal.vue';
import mapUtil from './mapUtil.js';
import boardUtil from '@/components/board/board.js';

export default {
    components: { Modal },
    data() {
        return {
            worlds: [],
            selectedWorld: ''
        }
    },
    methods: {
        onShow() {
            this.loadMaps();
        },
        loadMaps() {
            this.worlds = mapUtil.listMaps();
        },
        selected(world) {
            return this.selectedWorld === world;
        },
        loadMap() {
            window.console.log("loadMap");
            if (this.selectedWorld !== '') {
                const world = mapUtil.loadMap(this.selectedWorld);
                window.console.log('found object');
                window.console.log(world);
                boardUtil.newBoard(world);
            }
            this.$emit('close');
        },
        removeMap() {
            mapUtil.removeMap(this.selectedWorld);
            this.loadMaps();
        }
    }
}
</script>

<style scoped>
ul {
    padding-left: 0;
}

li {
    list-style: none;
    display: block;
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px;
    background-color: #ccc;
    user-select: none;
    margin-bottom: 4px;
}

li.selected {
    background-color: yellow;
}

li:not(.selected):hover {
    cursor: pointer;
}
</style>