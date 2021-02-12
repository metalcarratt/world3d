<template>
    <div class="mask">
        <div class="modal">
            <h2>Choose brush</h2><span class="button" @click="$emit('close')">Close X<Keypress>P</Keypress></span>
            <br/>

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
        </div>
    </div>
</template>

<script>
import Keypress from '@/components/Keypress.vue';
import ShowBlock from '@/components/edit/ShowBlock.vue';
import keyboard from '@/components/keyboard.js';

export default {
    components: { ShowBlock, Keypress },
    mounted() {
        keyboard.registerInterest({
            name: "ChooseBrush",
            key: keyboard.NUM0,
            condition : () => true,
            callback: () => {
                window.console.log("press 0");
                this.$emit('changeTo', 'water');
            }
        });

        keyboard.registerInterest({
            name: "ChooseBrush",
            key: keyboard.NUM1,
            condition : () => true,
            callback: () => {
                window.console.log("press 1");
                this.$emit('changeTo', 'grass');
            }
        });

        keyboard.registerInterest({
            name: "ChooseBrush",
            key: keyboard.NUM2,
            condition : () => true,
            callback: () => this.$emit('changeTo', 'rock')
        });

        keyboard.registerInterest({
            name: "ChooseBrush",
            key: keyboard.NUM3,
            condition : () => true,
            callback: () => this.$emit('changeTo', 'tree')
        });
    }
}
</script>

<style scoped>
h2 {
    font-size: 16px;
    font-weight: 700;
    font-family: sans-serif;
    display: inline-block;
}

span.button {
    border: 1px solid black;
    padding: 4px;
    border-radius: 4px;
    display: inline-block;
    float: right;
}

span.button:hover {
    cursor: pointer;
    background-color: #aaa;
}

div.mask {
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: #000000aa;
}

div.modal {
    width: 80%;
    /* height: 150px; */
    background-color: white;
    margin: 50px auto;
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px;
}

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