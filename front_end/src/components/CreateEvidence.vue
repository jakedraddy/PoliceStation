<template>
    <div>
        <b-jumbotron>
            <b-form @submit.prevent="save">
                <label>Address</label>
                <b-form-input v-model="Evidence.Address"
                    placeholder="Address (ex: 5555 Example Way)"> </b-form-input>
                <label>Location</label>
                <b-form-input v-model="Evidence.Location" 
                    placeholder="Location (bin: 5)" > </b-form-input>
                <label>Description</label>
                <b-form-textarea v-model="Evidence.Description" 
                    placeholder="Description of evidence found" rows="5"> </b-form-textarea>
                <b-button type="submit">Save Evidence</b-button>
            </b-form>
        </b-jumbotron>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import * as station from "../../../common/src/station";
import * as remote_api from "../remote_api";

import * as axios from "axios";
export default Vue.extend({
    data () {
        return {
            Evidence: undefined,
            save_message: "",
        }
    },
    mounted: function () {
        this.Evidence = new station.Evidence();
        this.Evidence.CaseId = this.$route.params.case_id;
    },
    methods: {
        save () {
            var that = this;
            remote_api.create_evidence(this.Evidence).then(function (response) {
                that.Evidence = response.data;
                that.$router.replace("/main/Cases");
            });
        }
    }
})
</script>
