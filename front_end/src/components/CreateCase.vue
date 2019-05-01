<template>
    <div>
        <b-jumbotron lead="New Case">
            <b-form @submit.prevent="save">
                <!-- <b> Case Number: {{ $case.CaseId }} </b> -->
                <b-form-input v-model="Case.Title" placeholder="Title of Case"></b-form-input>
                <b-form-group label="Case Status">
                    <b-form-select v-model="Case.Status" :options="status" required></b-form-select>
                </b-form-group>
                <b-button type="submit">Create Case</b-button>
            </b-form>
        </b-jumbotron>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as station from "../../../common/src/station";
import * as remote_api from "../remote_api"

import * as axios from 'axios';
export default Vue.extend({
    data () {
        return {
            Case: new station.Case(),
            save_message: "",
            status: ['Open', 'Closed'],
        }
    },

    methods: {
        save() {
            var that = this;
            remote_api.create_case(this.Case).then(function (response) {
                that.Case = response.data;
                that.$router.push("/main/Cases");
            });
        }
    }
})
</script>
