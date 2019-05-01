<template>
    <div>
        <h3 v-if="!forensicTests.length">Loading...</h3>
        <b-table striped hover small :items="cases" :fields="showTestInfo">
            <template slot="ViewInformation" slot-scope="row">
                <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
                </b-button>>
            </template>
            <template slot="ResultsDescript" slot-scope="row">
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
            showTestInfo: ['TestName', 'Date', 'ResultDescript', 'ViewInformation'],
            forensicTests: [] as ForensicTest[]
        }
    },
    mounted: function() {
        var that = this;
        axios.default({
            method: 'get',
            url: '/api/ftest/all'
        }).then((response) => {
            that.forensicTests = response.data;
        });
    },
    methods: {
        edit_test(TestId: number) { 
            this.$router.push({name: 'inspectTest', params: {test_Id: TestId}});
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