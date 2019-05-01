<template>
    <div>
        <h3 v-if="!visit.length">Loading...</h3>
        <b-table striped hover small :items="visit" :fields="showVisitInfo">
            <!-- <template slot="ViewInformation">
                <b-button @click="open_Visit(Visit.VisitNumber)">Open</b-button>
            </template> -->
            <template slot="VisitDescription" slot-scope="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Reason:</b></b-col>
                        <b-col>{{ row.visit.VisitReason }}</b-col>
                    </b-row>
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-card>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Visit } from '../../../common/src/station'

    import * as axios from 'axios';
export default Vue.extend({
    methods: {
        // open_Visit: function (VisitNumber: number) {
        //     this.$router.push({name: 'viewVisit', params: { VisitNumber: VisitNumber}})
        // }
    },
    data() {
        return {
            showVisitInfo: ['VisitId', 'PersonId', 'DateOfVisit',
             'VisitDescription', 'ViewInformation'],
            visit: [] as Visit[]
        }
    },
    mounted: function() {
        var that = this;
        axios.default({
            method: 'get',
            url: '/api/visit/all'
        }).then((response) => {
            that.visit = response.data;
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