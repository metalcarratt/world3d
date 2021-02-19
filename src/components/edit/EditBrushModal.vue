<template>
    <Modal title="Edit Brush" @close="$emit('close')" size="medium">
        <ShowBlock id="edit-brush" :brush="editBrush" size="s200" :orientation="cameraOrientation" />
        <table>
            <tr>
                <KeyButton @click="turnAnticlockwise" keypress="Q">◄</KeyButton>
                <KeyButton @click="raiseHeight" keypress="W">↑</KeyButton>
                <KeyButton @click="turnClockwise" keypress="E">►</KeyButton>
            </tr>
            <tr>
                <KeyButton @click="zoomOut" keypress="A">-</KeyButton>
                <KeyButton @click="lowerHeight" keypress="S">↓</KeyButton>
                <KeyButton @click="zoomIn" keypress="D">+</KeyButton>
            </tr>
        </table>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';
import ShowBlock from './ShowBlock.vue';
import KeyButton from '@/components/ui/KeyButton.vue';
import keyboard from '@/components/keyboard.js';

const N = "N", S = "S", E = "E", W = "W", NE = "NE", NW = "NW", SE = "SE", SW = "SW";

export default {
    components: { Modal, ShowBlock, KeyButton },
    props: [ 'editBrush', 'visible' ],
    data() {
        return {
            cameraOrientation: N
        }
    },
    mounted() {
        keyboard.registerAll({
            condition: () => this.visible,
            registrations: [
                {
                    key: keyboard.W,
                    callback: () => this.raiseHeight()
                },
                {
                    key: keyboard.S,
                    callback: () => this.lowerHeight()
                },
                {
                    key: keyboard.A,
                    callback: () => this.zoomOut()        
                },
                {
                    key: keyboard.D,
                    callback: () => this.zoomIn()        
                },
                {
                    key: keyboard.Q,
                    callback: () => this.turnAnticlockwise()
                },
                {
                    key: keyboard.E,
                    callback: () => this.turnClockwise()
                }
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