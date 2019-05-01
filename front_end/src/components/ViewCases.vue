<template>
    <div>
        <h3 v-if="!cases.length">Loading...</h3>
        <b-table striped small :items="cases" :fields="showCaseInfo">
            <template slot="Details" slot-scope="row">
                <b-button @click="row.toggleDetails" class="mr-2"> 
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Cases
                </b-button>
            </template>


            <template slot="ViewInformation">
                <b-button @click="open_case(Case.CaseId)">Edit</b-button>
            </template>

            <template slot="row-details" slot-scope="row">
                <b-card>
                    <b-table striped :items="cases"></b-table>
                </b-card>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Case, Evidence, ForensicTest } from '../../../common/src/station'

    import * as axios from 'axios';
export default Vue.extend({
    methods: {
        open_case: function (CaseId: number) {
            this.$router.push({name: 'viewCase', params: { CaseId: CaseId}})
        }
    },
    data() {
        return {
            showCaseInfo: ['CaseId', 'DateEntered', 'Status', 'Title',
             "Details", 'ViewInformation'],
            cases: [] as Case[],
            Evidence: [] as Evidence[],
            ForensicTest: [] as ForensicTest[],
        }
    },
    mounted: function() {
        axios.default({
            method: 'get',
            url: '/api/cases/all'
        }).then((response) => {
            this.cases = response.data;
        });
        //Then get all evidence and forensics for each Case
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
