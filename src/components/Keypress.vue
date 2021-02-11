<template>
    <span :class="inline? 'inline' : ''"><slot></slot></span>
</template>

<script>
export default {
    props: ["inline"]
}
</script>

<style scoped>
span {
    border: 1px solid #999;
    border-radius: 4px;
    display: block;
    padding: 1px;
    text-align: center;
    font-family: monospace;
    background-color: #f862e0;
    color: #333;
    width: 45px;
}

span.inline {
    display: inline-block !important;
}
</style>