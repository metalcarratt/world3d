<template>
    <Modal title="Edit texture" @close="$emit('close')">
        <div class="column image">
            <img :src="texture" ref="image" />
            <textarea :value="texture" />
        </div>
        <div class="column">
            <span v-if="!editSize">
                Size: {{ width }} x {{ height }} 
                <button @click="resize">Resize</button>
            </span>
            <span v-else>
                Size: <input type="number" v-model="editWidth" /> x <input type="number" v-model="editHeight" />
                <button @click="resizeUpdate">Update</button>
            </span>
            <button @click="autoShrink">Auto-shrink</button>
        </div>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/modal/Modal.vue';
import textureUtils from '@/components/map/texture.js';

export default {
    components: { Modal },
    data() {
        return {
            editTexture: '',
            image: {},
            height: 0,
            width: 0,
            editSize: false,
            editHeight: 0,
            editWidth: 0,
            texture: ''
        }
    },
    watch: {
        texture() {
            window.console.log("texture changed");
            this.image = this.$refs.image;
            this.image.addEventListener('load', () => {
                this.height = this.image.height;
                this.width = this.image.width;
            });
        },
        editTexture() {
            this.updateTexture();
        }
    },
    mounted() {
        this.updateTexture();
    },
    methods: {
        onShow({editTexture}) {
            this.editTexture = editTexture;
            this.updateTexture();
        },
        resize() {
            this.editSize = true;
            this.editHeight = this.height;
            this.editWidth = this.width;
        },
        resizeUpdate() {
            let inMemoryCanvas = document.createElement('canvas');
            inMemoryCanvas.width = this.editWidth;
            inMemoryCanvas.height = this.editHeight;
            window.console.log("resizeUpdate");
            window.console.log(inMemoryCanvas);
            const context = inMemoryCanvas.getContext('2d')
            context.drawImage(this.image, 0, 0, this.editWidth, this.editHeight);
            this.texture = inMemoryCanvas.toDataURL("image/jpeg");
            this.editSize = false;
        },
        updateTexture() {
            this.texture = textureUtils.getTextureForName(this.editTexture);
        },
        autoShrink() {
            if (this.width === this.height) {
                this.editWidth = 128;
                this.editHeight = 128;
            } else if (this.width > this.height) {
                this.editWidth = 256;
                this.editHeight = 128;
            } else {
                this.editWidth = 128;
                this.editHeight = 256;
            }
            this.resizeUpdate();
        }
    }  
}
</script>

<style scoped>
img {
    border: 3px solid #3089fb;
}

.image.column {
    width: 300px;
}

textarea {
    display: block;
    width: 100%;
    height: 100px;
}

input[type="number"] {
    width: 50px;
}
</style>