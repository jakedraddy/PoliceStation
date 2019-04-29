<template>
    <div>
        <ul id="v-for-object" class="employee">
            <li v-for="employee in employees"
            v-bind:key="employee.PersonId"
            v-bind:employee="employee">
                {{ employee.PersonId }} {{ employee.FirstName }} {{ employee.LastName }} <OpenPersonButton :id="employee.PersonId"></OpenPersonButton>
            </li>
        </ul>
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
    data() {
        return {
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
