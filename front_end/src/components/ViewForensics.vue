<template>
    <div>
        <h3 v-if="!cases.length">Loading...</h3>
        <b-table striped hover small :items="cases" :fields="showCaseInfo">
            <template slot="ViewInformation" slot-scope="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>>
            </template>
            <template slot="row-details" slot-scope="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Description:</b></b-col>
                        <b-col>{{ row.forensicTests.ResultsDescription }}</b-col>
                    </b-row>
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-card>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { ForensicTest } from '../../../common/src/station'
    import * as axios from 'axios';
export default Vue.extend({
    data() {
        return {
            showCaseInfo: ['TestName', 'Date', 'ResultDescription', 'ViewInformation'],
            forensicTests: [] as ForensicTest[]
        }
    },
    // mounted: function() {
    //     axios.default({
    //         method: 'post',
    //         url: '/api/cases/all'
    //     }).then((response) => {
    //         this.employees = response.data;
    //     });
    // },
    // methods: {
    //     open_case: function (CaseId: number) {
    //         this.$router.replace("api/cases/:id");
    //     }
    // }
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