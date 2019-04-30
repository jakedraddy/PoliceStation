<template>
    <div>
        <div id="v-for-object" class="emails">
            <div v-for="email in emails"
                :key="email.EId"
                :email="email">
                    <input v-bind:EmailAddress="this.emails.EmailAddress">
            </div>
        </div>
        <button @click="add_entry">Add an email</button>
    </div>
</template>


<script lang="ts">
import * as station from "../../../common/src/station"

import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
        }
    },
    props: {
        person: {
            required: true,
            type: station.Person
        }
    },
    methods: {
        add_entry() {
            var email = new station.Email();
            email.PersonId = this.person.PersonId;
            this.person.emails.push(email);
        }
    }
})
</script>
