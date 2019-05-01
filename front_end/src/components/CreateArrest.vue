<template>
    <div>
        <b-jumbotron lead="New Arrest Record">
        <b-form @submit="save">
            <b-form-input v-bind="arrest.BadgeId" placeholder="Badge Number"></b-form-input>
            <b-form-input v-bind="arrest.PersonId" placeholder="Id of PersonArrested"></b-form-input>
            <b-form-input v-bind="arrest.DateOfArrest" placeholder="Date of Arrest"></b-form-input>
            <b-form-textarea v-bind="arrest.ArrestReason" placeholder="Reason for arrest" 
            rows="3" max-rows="6">
            </b-form-textarea>
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
            arrest: new station.Arrest(),
            save_message: ""
        }
    },
    methods: {
        save() {

        },
        cancel() {
            this.$router.go(-1);
        }
    },
})
</script>