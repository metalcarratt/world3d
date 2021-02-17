<template>
    <div class="menu">
        <nav class="main">
            <NavLink @click="clickMap" :selected="mapSelected">Map</NavLink>
        </nav>
        <nav class="sub" v-if="mapSelected">
            <NavLink @click="clickMapNew">New</NavLink>
            <NavLink @click="clickMapLoad">Load</NavLink>
            <NavLink @click="clickMapSave">Save</NavLink>
        </nav>
        <NewMapModal v-show="showNewMapModal" @close="closeNewMapModal" />
        <SaveMapModal v-show="showSaveMapModal" @close="closeSaveMapModal" />
        <LoadMapModal v-show="showLoadMapModal" @close="closeLoadMapModal" ref="loadMapModal" />
    </div>
</template>

<script>
import NewMapModal from '@/components/map/NewMapModal.vue';
import SaveMapModal from '@/components/map/SaveMapModal.vue';
import LoadMapModal from '@/components/map/LoadMapModal.vue';
import NavLink from './NavLink.vue';
import modes from '@/components/modes/modes.js';

const NONE = "none";
const MAP = "map";

export default {
    components: { NewMapModal, SaveMapModal, LoadMapModal, NavLink },
    data() {
        return {
            selected: NONE,
            showNewMapModal: false,
            showSaveMapModal: false,
            showLoadMapModal: false
        }
    },
    computed: {
        mapSelected() {
            return this.selected == MAP;
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
        closeNewMapModal() {
            this.showNewMapModal = false;
            modes.modalClosed();
        },
        clickMapSave() {
            this.selected = NONE;
            this.showSaveMapModal = true;
            modes.modalOpened();
        },
        closeSaveMapModal() {
            this.showSaveMapModal = false;
            modes.modalClosed();
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
</style>