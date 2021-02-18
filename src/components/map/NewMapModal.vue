<template>
    <Modal title="New Map" @close="$emit('close')" size="medium">
        <fieldset>
            <label>Size</label>
            X: <input type="text" v-model="x" />
            Y: <input type="text" v-model="y" />
        </fieldset>

        <fieldset>
            <label>Base</label>
            Fill: <input type="radio" value="fill" v-model="base" />
            Random: <input type="radio" value="random" v-model="base" />
        </fieldset>

        <fieldset v-if="base === 'fill'">
            <label>Fill:</label>
            <select v-model="fill">
                <option>Grass</option>
                <option>Water</option>
                <option>Rock</option>
                <option>Tree</option>
            </select>
        </fieldset>
        <ModalButton @click="create">Create</ModalButton>
    </Modal>
</template>

<script>
import Modal from '@/components/ui/Modal.vue';
import boardUtil from '@/components/board/board.js';

export default {
    components: { Modal },
    data() {
        return {
            x: 10,
            y: 10,
            base: 'fill',
            fill: 'Grass'
        }
    },
    methods: {
        create() {
            window.console.log("create");
            let map=[];
            for (let iterY = 0; iterY < this.y; iterY++) {
                map[iterY] = [];
                for (let iterX = 0; iterX < this.x; iterX++) {
                    if (this.base === 'fill') {
                        if (this.fill === 'Water') {
                            map[iterY][iterX] = 0;
                        } else if (this.fill === 'Grass') {
                            map[iterY][iterX] = 1;
                        } else if (this.fill === 'Rock') {
                            map[iterY][iterX] = 2;
                        } else if (this.fill === 'Tree') {
                            map[iterY][iterX] = 3;
                        }
                    } else if (this.base === 'random') {
                        map[iterY][iterX] = Math.floor(Math.random() * 4);
                    }
                }
            }
            boardUtil.newBoard(map);
            this.$emit('close');
        }
    }
}
</script>

<style scoped>
fieldset {
    display: block;
}
</style>