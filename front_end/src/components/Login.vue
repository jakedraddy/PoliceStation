<template>
    <div>
        <b-form-input v-model="username" placeholder="Username"></b-form-input>
        <b-form-input v-model="password" placeholder="Password"></b-form-input>
        <div class="mt-2">Value: {{ password }}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            text: '',
            username: "",
            password: "",
        }
    },

    methods: {
        save() {
            fetch('localhost/api/auth', {
                method: 'get'
            }).then((response) => {
                return response.json()
            }).then((jsonData) => {
                this.employees = jsonData;
            })
            
        }
    }
})
</script>
