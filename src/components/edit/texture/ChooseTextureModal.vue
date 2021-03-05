<template>
    <Modal title="Choose texture" @close="$emit('close')">
        <span
            v-for="texture in textures"
            :class="['texture', selectedTexture === texture ? 'selected' : '']"
            :key="texture"
            @click="selectedTexture = texture"
        >
            <label>{{ texture }}</label>
            <img :src="getTexture(texture)"/>
        </span>
        <div>
            <ModalButton @click="editTexture">Edit</ModalButton>
        </div>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/modal/Modal.vue';
import textureUtils from '@/components/map/texture.js';
import modalEventBus from '@/components/ui/modal/modalEventBus.js';

export default {
    components: { Modal },
    data() {
        return {
            textures: [],
            selectedTexture: ''
        }
    },
    mounted() {
        this.textures = textureUtils.allTextures;
    },
    methods: {
        getTexture(textureName) {
            return textureUtils.getTextureForName(textureName);
        },
        editTexture() {
            modalEventBus.openModal(modalEventBus.EDIT_TEXTURE_MODAL, {editTexture: this.selectedTexture});
        }
    }
}
</script>

<style scoped>
label {
    display: block;
}

img {
    max-width: 100px;
    border-radius: 4px;
}

.texture {
    display: inline-block;
    margin: 4px;
    padding: 6px;
    border-radius: 8px;
}

.texture.selected {
    background-color: yellow;
}

.texture:not(.selected):hover {
    background-color: #aaa;
    cursor: pointer;
}
</style>