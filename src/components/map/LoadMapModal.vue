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
        <button @click="loadMap">Load</button>
    </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';
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
        loadMaps() {
            this.worlds = mapUtil.listMaps();
        },
        selected(world) {
            return this.selectedWorld === world;
        },
        loadMap() {
            if (this.selectedWorld !== '') {
                const map = mapUtil.loadMap(this.selectedWorld);
                boardUtil.newBoard(map);
            }
            this.$emit('close');
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