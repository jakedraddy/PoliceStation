<template>
    <div>
        <h3 v-if="!cases.length">Loading...</h3>
        <ul id="v-for-object" class="cases">
            <li v-for="Case in cases"
                :key="Case.CaseId"
                :Case="Case">
                {{ Case.CaseId }} {{ Case.DateEntered }} {{ Case.Status }} {{ Case.Title }} <button @click="open_case(Case.CaseId)">Open</button>
            </li>
        </ul>

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
    data() {
        return {
            showCaseInfo: ['CaseId', 'DateEntered', 'Status', 'Title', 'ViewInformation'],
            cases: [] as Case[]
        }
    },
    mounted: function() {
        axios.default({
            method: 'get_all_cases',
            url: '/api/cases/all'
        }).then((response) => {
            this.employees = response.data;
        });
    },
    methods: {
        open_case: function (CaseId: number) {
            this.$router.replace("ViewPerson");
        }
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
