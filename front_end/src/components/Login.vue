<template>
    <div>
        <b-form-input v-model="Username" placeholder="Username"></b-form-input>
        <b-form-input v-model="password" placeholder="Password"></b-form-input>
        <div class="mt-2">Value: {{ password }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            text: ''
        }
    }
})
</script>
