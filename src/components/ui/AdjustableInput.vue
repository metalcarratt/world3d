<template>
    <span>
        <button class="action" @click="downTen">
            &#12296;
        </button>
        <input type="text" size="1" v-model="value" @input="$emit('input', value)" />
        <button class="action" @click="upTen">
            &#12297;
        </button>
    </span>
</template>

<script>
export default {
    props: ['value'],
    methods: {
        downTen() {
            this.$emit('input', this.value - 10);
            this.$emit('propogate');
        },
        upTen() {
            this.$emit('input', this.value + 10);
            this.$emit('propogate');
        }
    }
}
</script>

<style scoped>
input[type="text"] {
    width: 20px;
}

button.action {
    padding: 0;
    background-color: #ffff57;
    border: 2px solid #ea9455;
}
</style>