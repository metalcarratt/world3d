<template>
    <div class="menu">
        <ul class="main">
            <li @click="clickMap" :class="mapSelected ? 'selected' : ''">
                Map
                <Keypress>1</Keypress>
            </li>
        </ul>
        <ul class="sub" @click="clickMapNew" v-if="mapSelected">
            <li>
                New
            </li>
        </ul>
        <NewMapModal v-show="showNewMapModal" @close="showNewMapModal = false" />
    </div>
</template>

<script>
import Keypress from '@/components/Keypress.vue';
import NewMapModal from '@/components/map/NewMapModal.vue';

const NONE = "none";
const MAP = "map";

export default {
    components: { Keypress, NewMapModal },
    data() {
        return {
            selected: NONE,
            showNewMapModal: false
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

ul {
    padding: 0;
    margin: 0;
}

ul.sub {
    position: absolute;
    bottom: 80px;
}

ul li {
    display: block;
    background-color: white;
    padding: 5px;
    border-radius: 40px;
    width: 70px;
    height: 70px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 15px;
    font-family: sans-serif;
}

ul li.selected {
    background-color: #aaa;
}

ul li:hover {
    cursor: pointer;
    border: 3px solid yellow;
    width: 76px;
    height: 76px;
    margin-left: -3px;
    margin-bottom: -3px;
    background-color: #aaa;
}

span.keypress {
    margin-left: 6px;
}
</style>