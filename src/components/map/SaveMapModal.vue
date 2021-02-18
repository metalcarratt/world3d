<template>
    <Modal title="Save Map" @close="$emit('close')" size="medium">
        <fieldset>
            <label>Map Name</label>
            <input type="text" v-model="mapName" />
        </fieldset>
        <ModalButton @click="saveMap">Save</ModalButton>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';
import mapUtil from './mapUtil.js';

export default {
    components: { Modal },
    data() {
        return {
            mapName: ""
        }
    },
    methods: {
        saveMap() {
            mapUtil.saveMap(this.mapName);
            this.$emit('close');
        }
    }
}
</script>