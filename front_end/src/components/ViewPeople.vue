<template>
    <div>
        <h3 v-if="!people">Loading...</h3>
        <b-table striped hover small :items="people" :fields="showpeopleInfo">
            <template slot="ViewInformation" slot-scope="data">
                <b-button @click="open_person(data.item.PersonId)">Open</b-button>
            </template>
        </b-table>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Person } from '../../../common/src/station';

import * as axios from 'axios';
export default Vue.extend({
    components: {
    },
    methods: {
        open_person(id: Number) {
            this.$router.push({name: 'viewPerson', params: { person_id: id}});
        }
    },
    data() {
        return {
            showpeopleInfo: ['FirstName', 'LastName', 'ViewInformation'],
            people: [] as Person[]
        }
    },
    mounted: function() {
        axios.default({
            method: 'get',
            url: '/api/Person/all'
        }).then((response) => {
            this.people = response.data;
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