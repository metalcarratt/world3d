<template>
    <Modal title="Edit Map" @close="$emit('close')" size="medium">
        <fieldset>
            <label>World Name: </label>
            <input type="text" v-model="worldName" />
        </fieldset>
        <ModalButton @click="updateMap">Save</ModalButton>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';
import boardUtil from '@/components/board/board.js';

export default {
    components: { Modal },
    computed: {
        worldName: {
            get() {
                return boardUtil.getName();
            },
            set() {
                boardUtil.changeName(this.worldName);
            }
        }
    },
    methods: {
        updateMap() {
            if (this.worldName) {
                mapUtil.saveMap(this.worldName);
                this.$emit('close');
            }
        }
    }    
}
</script>