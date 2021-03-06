<template>
    <Modal title="Edit Brush" @close="$emit('close')" size="large">
        <fieldset>
            <label>Name: </label>
            <input type="text" v-model="name" />
        </fieldset>
        <div class="column">
            <ShowBlock id="edit-brush" :brusho="polygon" size="s400" :orientation="cameraOrientation" :showFrame="true" />
            <table>
                <tr>
                    <KeyButton @click="turnAnticlockwise" keypress="Q">◄</KeyButton>
                    <KeyButton @click="turnClockwise" keypress="E">►</KeyButton>
                </tr>
            </table>
        </div>
        <div class="column">
            <h3>Polygons:</h3>
            <span v-for="key in polygonKeys" :key="key">
                <EditPolygon v-model="polygon[key]" />
            </span>
            <textarea disabled :value="'export default ' + JSON.stringify(polygon)">
            </textarea>
        </div>
        <div>
            <ModalButton @click="saveBrush">Save Brush</ModalButton>
            <ModalButton @click="addPolygon">Add Polygon</ModalButton>
        </div>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/modal/Modal.vue';
import ShowBlock from './ShowBlock.vue';
import KeyButton from '@/components/ui/KeyButton.vue';
import keyboard from '@/components/keyboard.js';
import EditPolygon from '@/components/edit/EditPolygon.vue';
import modalEventBus from '@/components/ui/modal/modalEventBus.js';

import modelUtil from '@/components/terrain/models.js';
import terrainUtil from '@/components/terrain/terrain.js';

const N = "N", S = "S", E = "E", W = "W", NE = "NE", NW = "NW", SE = "SE", SW = "SW";

export default {
    components: { Modal, ShowBlock, KeyButton, EditPolygon },
    props: [ 'visible' ],
    data() {
        return {
            cameraOrientation: N,
            polygon: [],
            name: '',
            editBrush: ''
        }
    },
    watch: {
        polygon: {
            deep: true,
            handler() {
                window.console.log("polygon updated (parent)");
            }
        },
        editBrush() {
            this.updateEditBrush();
        }
    },
    mounted() {
       this.updateEditBrush();
        // window.console.log("keys");
        // window.console.log(this.polygonKeys);
        
        keyboard.registerAll({
            condition: () => this.visible,
            registrations: [
                { key: keyboard.Q, callback: () => this.turnAnticlockwise() },
                { key: keyboard.E, callback: () => this.turnClockwise() }
            ]
        });
    },
    computed: {
        polygonKeys() {
            const keys = [];
            if (this.polygon) {
                for (let i = 0; i < this.polygon.length; i++) {
                    keys.push(i);
                }
            }
            return keys;
        }
    },
    methods: {
        onShow({editBrush}) {
            this.editBrush = editBrush;
            // this.updateEditBrush(editBrush);
        },
        updateEditBrush() {
            window.console.log("Edit brush: " + this.editBrush);
            if (this.editBrush === 'new') {
                this.polygon = [];
            } else if (this.editBrush) {
                this.polygon = modelUtil.getModelForName(this.editBrush);
                if (!this.polygon) {
                    this.polygon = terrainUtil.loadTerrain(this.editBrush).polygon;
                }
                this.name = this.editBrush;
            }
        },
        addPolygon() {
            this.polygon.push({"x":"0.05","y":"0.05","z":"0.05","w":"0.10","l":"0.10","h":"0.10","texture":"water"});
        },
        turnAnticlockwise() {
            switch(this.cameraOrientation) {
                case N:  this.cameraOrientation = NE;  break;
                case NE: this.cameraOrientation =  E;  break;
                case E:  this.cameraOrientation =  SE; break;
                case SE: this.cameraOrientation =  S;  break;
                case S:  this.cameraOrientation =  SW; break;
                case SW: this.cameraOrientation =  W;  break;
                case W:  this.cameraOrientation =  NW; break;
                case NW: this.cameraOrientation =  N;  break;
            }
        },
        turnClockwise() {
            switch(this.cameraOrientation) {
                case N:  this.cameraOrientation =  NW; break;
                case NW: this.cameraOrientation =  W;  break;
                case W:  this.cameraOrientation =  SW; break;
                case SW: this.cameraOrientation =  S;  break;
                case S:  this.cameraOrientation =  SE; break;
                case SE: this.cameraOrientation =  E;  break;
                case E:  this.cameraOrientation =  NE; break;
                case NE: this.cameraOrientation =  N;  break;
            }
        },
        saveBrush() {
            terrainUtil.saveTerrain(this.name, this.polygon);
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
/* .column {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
} */

h3 {
    font-family: sans-serif;
    margin-top: 0;
}

textarea {
    width: 500px;
    height: 150px;
    margin-top: 15px;
}
</style>
