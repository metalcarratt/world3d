<template>
    <a @click.prevent="$emit('click')" href="#" :class="selected ? 'selected' : ''"><slot></slot></a>
</template>

<script>
export default {
    props: ['selected']
}
</script>

<style scoped>
a {
    display: inline-block;
    background-color: white;
    padding: 5px;
    border-radius: 40px;
    width: 70px;
    height: 70px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 25px;
    font-family: sans-serif;
    margin-right: 10px;
    text-decoration: none;
    color: black;
}

a.selected {
    background-color: #aaa;
}

a:hover {
    cursor: pointer;
    border: 3px solid yellow;
    width: 76px;
    height: 76px;
    margin-left: -3px;
    margin-bottom: -3px;
    background-color: #aaa;
}
</style>