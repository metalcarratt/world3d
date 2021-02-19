<template>
    <td :class="!isNotEmpty? 'empty' : ''" @click="$emit('click')">
        <slot></slot>
        <Keypress v-if="keypress">{{ keypress }}</Keypress>
    </td>
</template>

<script>
import Keypress from '@/components/Keypress.vue';

export default {
    props: [ 'keypress' ],
    components: { Keypress },
    computed: {
        isNotEmpty() {
            return !!this.$slots.default;
        }
    }
}
</script>

<style scoped>
td {
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  user-select: none;
  text-align: center;
}

td.empty {
    background-color: #00000000;
    border: none;
}

td:hover {
  background-color: #aaa;
  cursor: pointer;
}

@media (hover: none) {
  td {
    width: 50px;
    height: 50px;
  }
}
</style>