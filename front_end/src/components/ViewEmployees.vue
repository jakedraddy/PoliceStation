<template>
    <div>
        <h3 v-if="!employees">Loading...</h3>
        <!-- >
        <ul id="v-for-object" class="employee">
            <li v-for="employee in employees"
            v-bind:key="employee.PersonId"
            v-bind:employee="employee">
                {{ employee.PersonId }} {{ employee.FirstName }} {{ employee.LastName }} <OpenPersonButton :id="employee.PersonId"></OpenPersonButton>
            </li>
        </ul>
        < -->
        <b-table striped hover small :items="employees" :fields="showEmployeesInfo">
            <template slot="ViewInformation" slot-scope="data">
                <b-button @click="open_person(data.item.PersonId)">Open</b-button>
            </template>
        </b-table>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Employee, Person } from '../../../common/src/station';
import OpenPersonButton from './OpenPersonButton.vue';

import * as axios from 'axios';
export default Vue.extend({
    components: {
        OpenPersonButton
    },
    methods: {
        open_person(id: Number) {
            this.$router.push({name: 'viewPerson', params: { person_id: id}});
        }
    },
    data() {
        return {
            showEmployeesInfo: ['FirstName', 'LastName', 'ViewInformation'],
            employees: [] as Person[]
        }
    },
    mounted: function() {
        axios.default({
            method: 'get',
            url: '/api/employee/all'
        }).then((response) => {
            this.employees = response.data;
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
