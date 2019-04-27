<template>
    <button v-on:click="$emit('open_person', {{id}})"></button>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            id: 0
        }
    }
})
</script>


