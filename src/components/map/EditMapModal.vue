<template>
    <Modal title="Edit Map" @close="$emit('close')" size="medium">
        <fieldset>
            <label>World Name: </label>
            <input type="text" v-model="worldName" />
        </fieldset>
        <fieldset>
            <label>Starting location</label>
            x: <input type="text" size="3" v-model="starting.x" />
            y: <input type="text" size="3" v-model="starting.y" />
            facing:
            <select v-model="starting.facing">
                <option value='up'>Up</option>
                <option value='down'>Down</option>
                <option value='left'>Left</option>
                <option value='right'>Right</option>
            </select>
        </fieldset>
        <ModalButton @click="updateMap">Save</ModalButton>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/modal/Modal.vue';
import boardUtil from '@/components/board/board.js';
import mapUtil from '@/components/map/mapUtil.js';

export default {
    components: { Modal },
    computed: {
        worldName: {
            get() {
                return boardUtil.getName();
            },
            set(incoming) {
                boardUtil.changeName(incoming);
            }
        },
        starting: {
            get() {
                return boardUtil.getStarting();
            },
            set(incoming) {
                boardUtil.setStarting(starting);
            }
        }
    },
    methods: {
        updateMap() {
            if (this.worldName) {
                mapUtil.saveMap(this.worldName, this.starting);
                this.$emit('close');
            }
        }
    }    
}
</script>