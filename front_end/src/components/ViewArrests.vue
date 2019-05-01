<template>
    <div>
        <h3 v-if="!arrests.length">Loading...</h3>
        <b-table striped hover small :items="arrests" :fields="showArrestInfo">
            <!-- <template slot="ViewInformation">
                <b-button @click="open_Arrest(Arrest.ArrestNumber)">Open</b-button>
            </template> -->
            <template slot="ArrestDescription" slot-scope="row">
                <b-card>
                    <b-row class="mb-2">
                        <b-col sm="3" class="text-sm-right"><b>Reason:</b></b-col>
                        <b-col>{{ row.arrests.ArrestReason }}</b-col>
                    </b-row>
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </b-card>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Arrest } from '../../../common/src/station'

    import * as axios from 'axios';
export default Vue.extend({
    methods: {
        // open_Arrest: function (ArrestNumber: number) {
        //     this.$router.push({name: 'viewArrest', params: { ArrestNumber: ArrestNumber}})
        // }
    },
    data() {
        return {
            showArrestInfo: ['ArrestNumber', 'PersonId', 'BadgeId',
             'DateOfArrest', 'ArrestDescription', 'ViewInformation'],
            arrests: [] as Arrest[]
        }
    },
    mounted: function() {
        axios.default({
            method: 'get',
            url: '/api/arrests/all'
        }).then((response) => {
            this.arrests = response.data;
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