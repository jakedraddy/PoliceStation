<template>
    <b-form @submit="onSubmit">
        <b-form-group id="inputFirstName" label="First Name">
            <b-form-input id="inputfName" v-model="person.FirstName" placeholder="first name"></b-form-input>
        </b-form-group>
        <b-form-group id="inputLastName" label="Last Name">
            <b-form-input id="inputlName" v-model="person.LastName" placeholder="last name"></b-form-input>
        </b-form-group>
        <b-form-group id="inputDoB" label="Date of Birth">
            <b-form-input id="inputdob" v-model="person.DoB" placeholder="date of birth"></b-form-input>
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

        <b-button type="save" variant="primary">save</b-button>
    </b-form>
</template>

<script lang="ts">
import Vue from 'vue'
import * as station from "../../../common/src/station";
import * as axios from 'axios';
export default Vue.extend({
    data() {
        return {
            person: new station.Person(),
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
})
</script>


