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
    </div>
</template>

<script>
import NavLink from './NavLink.vue';
import boardUtil from '@/components/board/board.js';
import mapUtil from '@/components/map/mapUtil.js';
import modalEventBus from '@/components/ui/modal/modalEventBus.js';

const NONE = "none";
const MAP = "map";

export default {
    components: { NavLink },
    data() {
        return {
            selected: NONE
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
            modalEventBus.openModal(modalEventBus.NEW_MAP_MODAL);
        },
        clickMapEdit() {
            this.selected = NONE;
            modalEventBus.openModal(modalEventBus.EDIT_MAP_MODAL);
        },
        clickMapSave() {
            this.selected = NONE;
            const name = boardUtil.getName();
            if (name) {
                mapUtil.saveMap(name);
            } else {
                modalEventBus.openModal(modalEventBus.EDIT_MAP_MODAL);
            }
        },
        clickMapLoad() {
            this.selected = NONE;
            modalEventBus.openModal(modalEventBus.LOAD_MAP_MODAL);
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