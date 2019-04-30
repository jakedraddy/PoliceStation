<template>
    <form>
        <input v:bind:PersonId="this.person.PersonId">
        <input v:bind:LastName="this.person.LastName">
        <input v:bind:FirstName="this.person.FirstName">
        <input v:bind:DoB="this.person.DoB">
        <input v:bind:SSN="this.person.SSN">
    
        <input v:bind:addresses="this.person.addresses">
        <input v:bind:emails="this.person.emails">
        <input v:bind:phones="this.person.phones">
        <input v:bind:employee="this.person.employee">
        <EditAddresses person="this.person"></EditAddresses>
        <EditEmails person="this.person"></EditEmails>
        <EditEmployee person="this.person"></EditEmployee>
        <EditPhones phones="this.person"></EditPhones>

        <button @click="save">Save</button>
        <p class="submit_message" v-if="this.save_message">{{ save_message }}</p>
    </form>
</template>


<script lang="ts">
import Vue from "vue";
import * as station from "../../../common/src/station";
import * as axios from "axios";
import * as remote_api from "../remote_api"

import EditAddresses from "./EditAddresses.vue"
import EditEmails from "./EditEmails.vue"
import EditEmployee from "./EditEmployee.vue"
import EditPhones from "./EditPhones.vue"

export default Vue.extend({
    data() {
        return {
            person: new station.Person(),
            save_message: ""
        }
    },
    components: {
        EditAddresses,
        EditEmails,
        EditEmployee,
        EditPhones
    },
    props: {
        person_id: {
            type: Number,
            required: true
        }
    },
    methods: {
        save() {
            remote_api.create_person(this.person).then((response) => {
                this.save_message = "Saved!";
            });
        }
    },
    mounted: function() {
        remote_api.get_person(this.$props.person_id).then((response) => {
            this.person = response.data;
        });
    }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
