<template>
    <div class="menu">
        <nav class="main">
            <NavLink @click="clickMap" :selected="mapSelected">Map</NavLink>
            <NavLink @click="clickMapEdit">Edit</NavLink>
            <NavLink @click="clickMapSave">Save</NavLink>
            <h1>{{ mapName }}</h1>
        </nav>
        <nav class="sub" v-if="mapSelected">
            <NavLink @click="clickMapNew">New</NavLink>
            <NavLink @click="clickMapLoad">Load</NavLink>
        </nav>
        <NewMapModal v-show="showNewMapModal" @close="closeNewMapModal" />
        <LoadMapModal v-show="showLoadMapModal" @close="closeLoadMapModal" ref="loadMapModal" />
        <EditMapModal v-show="showEditMapModal" @close="closeEditMapModal" />
    </div>
</template>

<script>
import NewMapModal from '@/components/map/NewMapModal.vue';
import LoadMapModal from '@/components/map/LoadMapModal.vue';
import EditMapModal from '@/components/map/EditMapModal.vue';
import NavLink from './NavLink.vue';
import modes from '@/components/modes/modes.js';
import boardUtil from '@/components/board/board.js';
import mapUtil from '@/components/map/mapUtil.js';

const NONE = "none";
const MAP = "map";

export default {
    components: { NewMapModal, LoadMapModal, EditMapModal, NavLink },
    data() {
        return {
            selected: NONE,
            showNewMapModal: false,
            showEditMapModal: false,
            showLoadMapModal: false
        }
    },
    computed: {
        mapSelected() {
            return this.selected == MAP;
        },
        mapName() {
            const name = boardUtil.getName();
            return name ? name : "Unnamed World";
        }
    },
    methods: {
        clickMap() {
            if (this.selected !== MAP) {
                this.selected = MAP;
            } else{
                this.selected = NONE;
            }
        },
        clickMapNew() {
            this.selected = NONE;
            this.showNewMapModal = true;
            modes.modalOpened();
        },
        clickMapEdit() {
            this.selected = NONE;
            this.showEditMapModal = true;
            modes.modalOpened();
        },
        closeNewMapModal() {
            this.showNewMapModal = false;
            modes.modalClosed();
        },
        clickMapSave() {
            this.selected = NONE;
            const name = boardUtil.getName();
            if (name) {
                mapUtil.saveMap(name);
            } else {
                this.showEditMapModal = true;
                modes.modalOpened();
            }
        },
        clickMapLoad() {
            this.$refs['loadMapModal'].loadMaps();
            this.selected = NONE;
            this.showLoadMapModal = true;
            modes.modalOpened();
        },
        closeLoadMapModal() {
            this.showLoadMapModal = false;
            modes.modalClosed();
        },
        closeEditMapModal() {
            this.showEditMapModal = false;
            modes.modalClosed();
        }
    }
}
</script>

<style scoped>
div {
  position: absolute;
  bottom: 15px;
  left: 10px;
}

nav {
    padding: 0;
    margin: 0;
    width: 800px;
}

nav.sub {
    position: absolute;
    bottom: 80px;
}

span.keypress {
    margin-left: 6px;
}

h1 {
    display: inline-block;
    background: white;
    padding: 6px 31px;
    border-radius: 18px;
    font-family: sans-serif;
    font-size: 18px;
    margin-left: 68px;
}
</style>