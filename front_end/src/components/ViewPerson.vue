<template>
    <form>
        <input v-bind:person="person">
        <EditEmployee person="person"></EditEmployee>

        <button @click="save">Save</button>
        <p class="submit_message" v-if="this.save_message">{{ save_message }}</p>
    </form>
</template>


<script lang="ts">
import Vue from "vue";
import { Person } from "../../../common/src/station";
import * as axios from "axios";

export default Vue.extend({
    data() {
        return {
            person: new Person(),
            save_message: ""
        }
    },
    props: ["person_id"],
    methods: {
        save() {
            axios.default({
                method: "post",
                url: "/api/person/create",
                data: this.person,
            }).then((response) => {
                this.save_message = "Saved!";
            });
        }
    },
    mounted: async function() {
        axios.default({
            method: "post",
            url: "/api/person/get/",
            params: {
                PersonId: this.$props.person_id
            },
        }).then((response) => {
            this.person = response.data;
        });
    }
})
</script>
