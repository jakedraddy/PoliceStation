<template>
    <div>
        <b-jumbotron lead="Add new person to the database...">
            <b-form @submit.prevent="save">
                <b-form-input required id="inputfName" v-bind="person.FirstName" placeholder="first name"></b-form-input>
                <b-form-input required id="inputlName" v-bind="person.LastName" placeholder="last name"></b-form-input>
                <b-form-input required id="inputdob" v-bind="person.DoB" placeholder="date of birth"></b-form-input>
                <b-form-input id="inputssn" v-bind="person.SSN" placeholder="123-45-6789"></b-form-input>
                <b-button type="submit" variant="primary">Save</b-button>
                <b-button type="button">Cancel</b-button>
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
            var that = this;
            axios.default({
                method: "post",
                url: "/api/person/create",
                data: this.person,
            }).then((response) => {
                that.save_message = "Saved!";
            });
        },
        cancel: function() {
            this.$router.push("main");
        }
    },
})
</script>


