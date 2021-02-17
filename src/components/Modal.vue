<template>
    <div class="mask">
        <div class="modal" :class="size">
            <h2>{{ title }}</h2>
            <span class="button" @click="$emit('close')">Close X<Keypress v-if="keypress">{{ keypress }}</Keypress></span>
            <br/>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Keypress from '@/components/Keypress.vue';

export default {
    props: ['title', 'keypress', 'size'],
    components: { Keypress }
}
</script>

<style scoped>
/* modal */
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

div.modal.medium {
    width: 600px;
}

/* title */
h2 {
    font-size: 16px;
    font-weight: 700;
    font-family: sans-serif;
    display: inline-block;
}

/* close */
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
</style>