<template>
    <div>
        <b-jumbotron lead="Add new person to the database...">
            <b-form @submit="save">
                <b-form-input id="inputfName" v-bind="person.FirstName" placeholder="first name"></b-form-input>
                <b-form-input id="inputlName" v-bind="person.LastName" placeholder="last name"></b-form-input>
                <b-form-input id="inputdob" v-bind="person.DoB" placeholder="date of birth"></b-form-input>
                <b-form-input id="inputssn" v-bind="person.SSN" placeholder="123-45-6789"></b-form-input>
                <b-button type="save" variant="primary">Save</b-button>
                <b-button type="cancel">Cancel</b-button>
            </b-form>
        </b-jumbotron>
    </div>
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
    props: {
        person_id: {
            type: Number,
            required: true
        }
    },
    methods: {
        save() {
            axios.default({
                method: "post",
                url: "/api/person/create",
                data: this.person,
            }).then((response) => {
                this.save_message = "Saved!";
            });
        },
        cancel: function() {
            this.$router.push("main");
        }
    },
})
</script>


