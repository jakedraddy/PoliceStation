<template>
    <div>
        <b-form-input v-model="username" placeholder="Username"></b-form-input>
        <b-form-input v-model="password" placeholder="Password"></b-form-input>
        <button type="button" @click="login">Login</button>
        <span v-if="error != ''" v-bind="error" class="error">{{ error }}</span>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as axios from 'axios'
import { AuthResult } from '../../../common/src/api_model'

import * as crypto from 'crypto-js'
export default Vue.extend({
    data() {
        return {
            text: '',
            username: "",
            password: "",
            error: "",
        }
    },

    methods: {
        login() {
            axios.default({
                method: 'get',
                url: '/api/auth',
                params: {
                    username: this.username,
                    password: crypto.createHash('sha256').update(this.password).digest("hex")
            }}).then((api_response) => {
                let response: AuthResult = api_response.data;

                if (response.result) {
                    this.error = "";
                    this.$root.user = response.user;
                    this.$router.replace("main");
                } else {
                    this.error = "Invalid username or password.";
                };
            })
        }
    }
})
</script>

<style>

</style>
