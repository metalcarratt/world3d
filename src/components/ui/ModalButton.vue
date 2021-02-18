<template>
    <button @click="$emit('click')"><slot></slot></button>
</template>

<style scoped>
button {
    background-color: #eee;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #aaa;
    margin-top: 8px;
}

button:hover {
    cursor: pointer;
    background-color: #ccc;
}
</style>