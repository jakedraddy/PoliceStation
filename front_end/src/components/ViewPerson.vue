<template>

    <b-form v-if="person" @submit="save">
        <b-form-group id="inputFirstName" label="First Name">
            <b-form-input id="inputfName" v-model="person.FirstName" placeholder="first name"></b-form-input>
        </b-form-group>
        <b-form-group id="inputLastName" label="Last Name">
            <b-form-input id="inputlName" v-model="person.LastName" placeholder="last name"></b-form-input>
        </b-form-group>
        <b-form-group id="inputDoB" label="Date of Birth">
            <b-form-input id="inputdob" type="date" 
                    :value="person.DoB && person.DoB.toISOString().split('T')[0]"
                    v-on:input="update_dob"
                    placeholder="date of birth"></b-form-input>
        </b-form-group>
        <b-form-group id="inputSSN" label="Social Security Number">
            <b-form-input id="inputssn" v-model="person.SSN" placeholder="123-45-6789"></b-form-input>
        </b-form-group>
        <!--- >
        <b-form-group id="inputPhoneNumber" label="Phone Number">
            <b-form-input id="inputphonenumber" v-model="form.name" placeholder="123 456 7890"></b-form-input>
        </b-form-group>
        <b-form-group id="inputAddress" label="Address">
            <b-form-input id="" v-model="form.name" placeholder="5555 Secret Street"></b-form-input>
        </b-form-group>
        <b-form-group id="inputEmail" label="Email">
            <b-form-input id="inputemail" v-model="form.email" 
            type="email" placeholder="example@aol.com"></b-form-input>
        </b-form-group>
        < --->
        <b-form-group id="inputEmail" label="Emails">
            <div v-for="email in person.emails" 
            :key="email.EId"
            :email="email">
                <b-form-input id="v-for-object" type="email" class="emails" v-model="email.EmailAddress"></b-form-input>
            </div>
            <b-button href="#" @click="add_email">Add a new email</b-button>
        </b-form-group>

        <b-button type="submit" variant="primary">save</b-button>

        <p class="submit_message" v-if="this.save_message">{{ save_message }}</p>
    </b-form>
</template>


<script lang="ts">
import Vue from "vue";
import * as station from "../../../common/src/station";
import * as axios from "axios";
import * as remote_api from "../remote_api"

export default Vue.extend({
    data() {
        return {
            person: undefined as station.Person,
            save_message: ""
        }
    },
    methods: {
        save() {
            remote_api.create_person(this.person).then((response) => {
                this.save_message = "Saved!";
            });
        },

        add_email() {
            var email = new station.Email();
            email.PersonId = this.person.PersonId;
            this.person.emails.push(email);
        },

        update_dob(event) {
            this.person.DoB = new Date(event);
        }
    },
    mounted: function() {
        remote_api.get_person(this.$route.params.person_id).then((response) => {
            response.data.DoB = new Date(response.data.DoB);
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
