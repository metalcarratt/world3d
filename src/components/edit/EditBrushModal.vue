<template>
    <Modal title="Edit Brush" @close="$emit('close')" size="medium">
        <div class="column">
            <ShowBlock id="edit-brush" :brusho="polygon" size="s200" :orientation="cameraOrientation" />
            <table>
                <tr>
                    <KeyButton @click="turnAnticlockwise" keypress="Q">◄</KeyButton>
                   <!-- <KeyButton @click="raiseHeight" keypress="W">↑</KeyButton>-->
                    <KeyButton @click="turnClockwise" keypress="E">►</KeyButton>
                </tr>
       <!--         <tr>
                    <KeyButton @click="zoomOut" keypress="A">-</KeyButton>
                    <KeyButton @click="lowerHeight" keypress="S">↓</KeyButton>
                    <KeyButton @click="zoomIn" keypress="D">+</KeyButton>
                </tr>-->
            </table>
        </div>
        <div class="column">
            <h3>Polygons:</h3>
            <EditPolygon v-model="polygon" />
        </div>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';
import ShowBlock from './ShowBlock.vue';
import KeyButton from '@/components/ui/KeyButton.vue';
import keyboard from '@/components/keyboard.js';
import EditPolygon from '@/components/edit/EditPolygon.vue';

const N = "N", S = "S", E = "E", W = "W", NE = "NE", NW = "NW", SE = "SE", SW = "SW";

export default {
    components: { Modal, ShowBlock, KeyButton, EditPolygon },
    props: [ 'editBrush', 'visible' ],
    data() {
        return {
            cameraOrientation: N,
            polygon: {
                x: 0.5, y: 0.5, z: 0.5, w: 0.5, l: 0.5, h: 0.5,
                texture: 'water'
            }
        }
    },
    watch: {
        polygon: {
            deep: true,
            handler() {
                window.console.log("polygon updated (parent)");
            }
        }
    },
    mounted() {
        keyboard.registerAll({
            condition: () => this.visible,
            registrations: [
                // { key: keyboard.W, callback: () => this.raiseHeight() },
                // { key: keyboard.S, callback: () => this.lowerHeight() },
                // { key: keyboard.A, callback: () => this.zoomOut() },
                // { key: keyboard.D, callback: () => this.zoomIn() },
                { key: keyboard.Q, callback: () => this.turnAnticlockwise() },
                { key: keyboard.E, callback: () => this.turnClockwise() }
            ]
        });
    },
    methods: {
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
        raiseHeight() {

        },
        lowerHeight() {

        },
        zoomIn() {

        },
        zoomOut() {

        }
    }
}
</script>

<style scoped>
.column {
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
}

h3 {
    font-family: sans-serif;
    margin-top: 0;
}
</style>
