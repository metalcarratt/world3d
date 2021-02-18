<template>
    <Modal title="Choose brush" @close="$emit('close')" keypress="P">
        <div class="item" @click="$emit('changeTo', 'water')">
            <ShowBlock id="brush-water" brush="water" />
            <Keypress :inline="true">0</Keypress>
        </div>

        <div class="item" @click="$emit('changeTo', 'grass')">
            <ShowBlock id="brush-grass" brush="grass" />
            <Keypress :inline="true">1</Keypress>
        </div>

        <div class="item" @click="$emit('changeTo', 'rock')">
            <ShowBlock id="brush-rock" brush="rock" />
            <Keypress :inline="true">2</Keypress>
        </div>

        <div class="item" @click="$emit('changeTo', 'tree')">
            <ShowBlock id="brush-tree" brush="tree" />
            <Keypress :inline="true">3</Keypress>
        </div>
    </Modal>
</template>

<script>
import Keypress from '@/components/Keypress.vue';
import ShowBlock from '@/components/edit/ShowBlock.vue';
import keyboard from '@/components/keyboard.js';
import Modal from '@/components/ui/Modal.vue';

export default {
    props: ['visible'],
    components: { ShowBlock, Keypress, Modal },
    mounted() {
        keyboard.registerAll({
            condition : () => this.visible,
            registrations: [
                {
                    key: keyboard.NUM0,
                    callback: () => this.$emit('changeTo', 'water')
                },
                {
                    key: keyboard.NUM1,
                    callback: () => this.$emit('changeTo', 'grass')
                },
                {
                    key: keyboard.NUM2,
                    callback: () => this.$emit('changeTo', 'rock')
                },
                {
                    key: keyboard.NUM3,
                    callback: () => this.$emit('changeTo', 'tree')
                }
            ]
        });
    }
}
</script>

<style scoped>




div.item {
    display: inline-block;
    padding: 6px;
    border-radius: 4px;
}

div.item:hover {
    cursor: pointer;
    background-color: #aaa;
}
</style>