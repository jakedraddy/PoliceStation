<template>
    <div>
        <h3 v-if="!cases.length">Loading...</h3>
        <b-table striped hover small :items="cases" :fields="showCaseInfo">
            <template slot="ViewInformation">
                <b-button @click="open_case(Case.CaseId)">Open</b-button>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Case } from '../../../common/src/station'

    import * as axios from 'axios';
export default Vue.extend({
    methods: {
        open_case: function (CaseId: number) {
            this.$router.push({name: 'viewCase', params: { CaseId: CaseId}})
        }
    },
    data() {
        return {
            showCaseInfo: ['CaseId', 'DateEntered', 'Status', 'Title', 'ViewInformation'],
            cases: [] as Case[]
        }
    },
    mounted: function() {
        axios.default({
            method: 'get',
            url: '/api/cases/all'
        }).then((response) => {
            this.cases = response.data;
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
