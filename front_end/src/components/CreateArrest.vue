<template>
    <div>
        <b-jumbotron lead="New Arrest Record">
        <b-form @submit.prevent="save">
            <b-form-input v-model="arrest.BadgeId" placeholder="Badge Number"></b-form-input>
            <b-form-input v-model="arrest.PersonId" placeholder="Id of PersonArrested"></b-form-input>
            <b-form-input v-model="arrest.DateOfArrest" placeholder="Date of Arrest"></b-form-input>
            <b-form-textarea v-model="arrest.ArrestReason" placeholder="Reason for arrest" 
            rows="3" max-rows="6">
            </b-form-textarea>
            <b-button type="submit" variant="primary">Save</b-button>
            <b-button type="button" @click="cancel">Cancel</b-button>
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