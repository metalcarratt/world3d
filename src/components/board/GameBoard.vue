<template>
    <div id="gameBoard">
        <!--
        X<input type="text" v-model="camera.rotation.x"/>
        Y<input type="text" v-model="camera.rotation.y"/>
        Z<input type="text" v-model="camera.rotation.z"/>

        Facing=<select v-model="cface">
                <option>N</option>
                <option>S</option>
                <option>E</option>
                <option>W</option>
                <option>NE</option>
                <option>NW</option>
                <option>SE</option>
                <option>SW</option>
               </select>
               -->
    </div>
</template>

<script>
import canvas from './canvas.js';

export default {
    props: ['palette'],
    mounted() {
        canvas.initRenderer();
        canvas.initBoard();
        canvas.animate();
        this.$nextTick(function () {
            canvas.nextTick();
        });
    }
}
</script>

<style>
canvas {
	width: 100%;
	height: 100%;
    background-color: green;
}
</style>