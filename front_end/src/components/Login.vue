<template>
    <div>
        <b-jumbotron header="Welcome to JDPS Archive" 
            lead="Please log in to continue..." 
            hr class="my-4"
            fluid="true">
            <b-form-input v-model="username" placeholder="Username"></b-form-input>
            <b-form-input v-model="password" type="password" placeholder="Password"></b-form-input>
            <button type="button" @click="login">Login</button>
            <span v-if="error != ''" v-bind="error" class="error">{{ error }}</span>
        </b-jumbotron>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as axios from "axios";
import * as crypto from "crypto-js";

import { AuthResult } from "../../../common/src/api_model";

export default Vue.extend({
    data() {
        return {
            text: "",
            username: "",
            password: "",
            error: "",
        }
    },

    methods: {
        login() {
            var that = this;
            axios.default({
                method: "get",
                url: "/api/auth",
                params: {
                    username: this.username,
                    password:  crypto.enc.Hex.stringify(crypto.SHA256(this.password)) 
            }}).then((api_response) => {
                let response: AuthResult = api_response.data;

                if (response.result) {
                    that.error = "";
                    that.$root.user = response.user;
                    that.$router.replace("main");
                } else {
                    that.error = "Invalid username or password.";
                };
            })
        }
    }
})
</script>

<style>

</style>
