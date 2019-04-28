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
import * as axios from 'axios';
export default Vue.extend({
    data() {
        return {
            employees: [] as Person[]
        }
    },
    mounted: function() {
        axios.default({
            method: 'post',
            url: '/api/employee/all'
        }).then((response) => {
            this.employees = response.data;
        });
    }
});
</script>
